const GENAPI_BASE = 'https://api.gen-api.ru/api/v1';

type GenApiCreateResponse = {
  request_id?: number;
  status?: string;
  model?: string;
  result?: unknown[];
  error?: unknown;
  errors_validation?: Record<string, string[]>;
};

type GenApiResultResponse = {
  id?: number;
  status?: string;
  result?: unknown[];
  error?: unknown;
  progress?: number;
  response_type?: string;
};

export type GenApiFileUpload = {
  field: string;
  buffer: Buffer;
  filename: string;
  mime: string;
};

const getApiKey = () => {
  const key = process.env.GENAPI_API_KEY;
  if (!key) {
    throw new Error('GENAPI_API_KEY не задан. Добавьте ключ в .env');
  }
  return key;
};

const authHeader = () => ({
  Authorization: `Bearer ${getApiKey()}`,
});

const formatGenApiError = (payload: GenApiCreateResponse, status: number, networkId: string) => {
  if (payload.errors_validation) {
    const details = Object.entries(payload.errors_validation)
      .flatMap(([field, messages]) => messages.map((message) => `${field}: ${message}`))
      .join('; ');
    if (details) return details;
  }

  if (typeof payload.error === 'string' && payload.error) return payload.error;
  if (payload.error && typeof payload.error === 'object' && 'message' in payload.error) {
    return String((payload.error as { message: unknown }).message);
  }
  if (payload.error === true) {
    return `GenAPI validation error (${status}) для ${networkId}`;
  }

  return `GenAPI ${status}: ${networkId}`;
};

const parseCreateResponse = (payload: GenApiCreateResponse, status: number, networkId: string) => {
  if (status < 200 || status >= 300) {
    throw new Error(formatGenApiError(payload, status, networkId));
  }

  if (payload.result?.length) {
    return { requestId: payload.request_id, result: payload.result, status: payload.status ?? 'success' };
  }

  if (!payload.request_id) {
    throw new Error(`GenAPI не вернул request_id для ${networkId}`);
  }

  return { requestId: payload.request_id, result: undefined, status: payload.status ?? 'processing' };
};

const appendMessages = (form: FormData, messages: unknown) => {
  if (!Array.isArray(messages)) return;

  messages.forEach((message, messageIndex) => {
    if (!message || typeof message !== 'object') return;

    const record = message as Record<string, unknown>;
    if (typeof record.role === 'string') {
      form.append(`messages[${messageIndex}][role]`, record.role);
    }

    const { content } = record;
    if (typeof content === 'string') {
      form.append(`messages[${messageIndex}][content]`, content);
      return;
    }

    if (!Array.isArray(content)) return;

    content.forEach((part, partIndex) => {
      if (!part || typeof part !== 'object') return;

      const partRecord = part as Record<string, unknown>;
      if (typeof partRecord.type === 'string') {
        form.append(`messages[${messageIndex}][content][${partIndex}][type]`, partRecord.type);
      }

      if (partRecord.type === 'text' && typeof partRecord.text === 'string') {
        form.append(`messages[${messageIndex}][content][${partIndex}][text]`, partRecord.text);
      }

      if (partRecord.type === 'image_url' && partRecord.image_url && typeof partRecord.image_url === 'object') {
        const url = (partRecord.image_url as Record<string, unknown>).url;
        if (typeof url === 'string') {
          form.append(`messages[${messageIndex}][content][${partIndex}][image_url][url]`, url);
        }
      }
    });
  });
};

const appendFields = (form: FormData, fields: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;

    if (typeof value === 'object' && !Array.isArray(value)) {
      form.append(key, JSON.stringify(value));
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => form.append(`${key}[]`, String(item)));
      continue;
    }

    form.append(key, String(value));
  }
};

export type CreateNetworkRequestOptions = {
  multipartFields?: Record<string, string>;
  forceMultipart?: boolean;
};

export const createNetworkRequest = async (
  networkId: string,
  fields: Record<string, unknown>,
  files: GenApiFileUpload[] = [],
  options?: CreateNetworkRequestOptions,
) => {
  const multipartFields = options?.multipartFields ?? {};
  const useMultipart = Boolean(options?.forceMultipart || files.length || Object.keys(multipartFields).length);

  if (useMultipart) {
    const form = new FormData();

    Object.entries(multipartFields).forEach(([key, value]) => {
      form.append(key, value);
    });

    const { messages, ...rest } = fields;
    if (messages !== undefined) {
      appendMessages(form, messages);
    }
    appendFields(form, rest);

    for (const file of files) {
      const blob = new Blob([Uint8Array.from(file.buffer)], { type: file.mime });
      form.append(file.field, blob, file.filename);
    }

    const response = await fetch(`${GENAPI_BASE}/networks/${networkId}`, {
      method: 'POST',
      headers: authHeader(),
      body: form,
    });

    const payload = (await response.json()) as GenApiCreateResponse;
    return parseCreateResponse(payload, response.status, networkId);
  }

  const response = await fetch(`${GENAPI_BASE}/networks/${networkId}`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  const payload = (await response.json()) as GenApiCreateResponse;
  return parseCreateResponse(payload, response.status, networkId);
};

export const pollRequestResult = async (requestId: number, options?: { maxAttempts?: number; delayMs?: number }) => {
  const maxAttempts = options?.maxAttempts ?? 120;
  const delayMs = options?.delayMs ?? 3000;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const response = await fetch(`${GENAPI_BASE}/request/get/${requestId}`, {
      headers: authHeader(),
    });

    const payload = (await response.json()) as GenApiResultResponse;

    if (!response.ok) {
      const message =
        typeof payload.error === 'string'
          ? payload.error
          : `GenAPI poll ${response.status}`;
      throw new Error(message);
    }

    const status = payload.status?.toLowerCase();

    if (status === 'success' || status === 'completed') {
      if (!payload.result?.length) {
        throw new Error('GenAPI вернул success без result');
      }
      return payload.result;
    }

    if (status === 'failed' || status === 'error') {
      throw new Error(typeof payload.error === 'string' ? payload.error : 'GenAPI generation failed');
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error(`GenAPI timeout для request_id=${requestId}`);
};

export const fileToDataUrl = (buffer: Buffer, mime: string) =>
  `data:${mime};base64,${buffer.toString('base64')}`;

export const downloadUrlToBuffer = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не удалось скачать файл: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const extractTextFromGenApiResult = (result: unknown[]) => {
  const parts = result
    .map((item) => {
      if (typeof item === 'string') return item;

      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;

        if (typeof record.content === 'string') return record.content;
        if (typeof record.text === 'string') return record.text;

        const choices = record.choices;
        if (Array.isArray(choices) && choices[0] && typeof choices[0] === 'object') {
          const message = (choices[0] as Record<string, unknown>).message;
          if (message && typeof message === 'object') {
            const content = (message as Record<string, unknown>).content;
            if (typeof content === 'string') return content;
          }
        }
      }

      return null;
    })
    .filter((part): part is string => Boolean(part));

  if (!parts.length) {
    throw new Error('GenAPI вернул result без текстового content');
  }

  return parts.join('\n\n');
};

export const extractSvgFromText = (text: string) => {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:svg|xml)?\s*([\s\S]*?)```/i)?.[1]?.trim();
  const candidate = fenced ?? trimmed;
  const svgMatch = candidate.match(/<svg[\s\S]*<\/svg>/i);

  if (!svgMatch) {
    throw new Error('Ответ не содержит валидный SVG');
  }

  return svgMatch[0].trim();
};

export const extractSvgFromGenApiResult = (result: unknown[]) => {
  const text = extractTextFromGenApiResult(result);
  return extractSvgFromText(text);
};

export const isHttpUrl = (url?: string) => Boolean(url && /^https?:\/\//.test(url));

export type GenApiImageInput = {
  url?: string;
  buffer: Buffer;
  filename: string;
  mime: string;
};

export const createLlmVisionRequest = async (
  networkId: string,
  prompt: string,
  image: GenApiImageInput,
  extraFields: Record<string, unknown> = {},
) => {
  const visionMessages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        ...(isHttpUrl(image.url)
          ? [{ type: 'image_url', image_url: { url: image.url } }]
          : []),
      ],
    },
  ];

  if (isHttpUrl(image.url)) {
    return createNetworkRequest(networkId, {
      ...extraFields,
      messages: visionMessages,
      is_sync: false,
    });
  }

  return createNetworkRequest(
    networkId,
    {
      ...extraFields,
      messages: visionMessages,
      is_sync: false,
    },
    [
      {
        field: 'image_urls[]',
        buffer: image.buffer,
        filename: image.filename,
        mime: image.mime,
      },
    ],
  );
};

export const extractUrlsFromGenApiResult = (result: unknown[]) => {
  const urls = result
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        if (typeof record.url === 'string') return record.url;
      }
      return null;
    })
    .filter((url): url is string => Boolean(url));

  if (!urls.length) {
    throw new Error('GenAPI вернул result без URL');
  }

  return urls;
};
