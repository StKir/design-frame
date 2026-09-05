смотри сейчас я тебя буду описывать Paylin генерации изображения для нашего MVP первый этап plight сделай админку небольшую куда где будет вот эти все этапы первый этап это я кидаю тебе изображение и ты отправляешь его в GPT image Pro для генерации

создай файл env с ключом

https://gen-api.ru/docs
подключая через либу ai-sdk-genapi

- model: gpt-image-2

- Промт для генерации скетча
  `Use the attached reference as the basis for creating a NEW original architectural sketch. Create an  architectural drawing inspired by the reference, preserving its architectural character, main forms, proportions, composition, and perspective, but do NOT copy the image literally. The result must be an original, simplified architectural line sketch. ### CRITICALLY IMPORTANT STYLE Imagine an architect using a graphic tablet and carefully tracing the main architectural forms of the building with a black ink pen, adding only the most important architectural details. This is NOT a pencil drawing. This is NOT a realistic drawing. This is NOT concept art. This is NOT a painterly sketch. It is a clean black ink architectural line sketch. Use primarily: * black contour lines; * thin ink-pen lines; * subtle natural imperfections of hand-drawn linework; * natural variation in line weight; * short individual lines for architectural details; * minimal hatching. ### SIMPLIFICATION The image MUST be SIMPLIFIED. Do not attempt to reproduce every detail from the reference. Select only the main architectural forms and the most important details that make the building recognizable. Remove: * tiny unnecessary details; * complex textures; * photographic details; * excessive shadows; * complex tonal transitions; * dense hatching; * realistic material textures; * random small elements. The drawing should be simple enough that a person could logically recreate it step by step, one meaningful line or architectural element at a time. ### LINES INSTEAD OF SHADING The main visual information must be communicated through LINES, not realistic lighting or shading. Do not create large dark areas. Do not use soft gradients. Do not use pencil-style blending. Do not create realistic shadows. When depth needs to be communicated, use a few short ink strokes or slightly stronger contour lines. Keep most of the white space completely clean. ### ARCHITECTURE Clearly define: * the overall silhouette of the building; * major planes; * windows; * doors; * columns; * arches; * stairs; * roof; * cornices; * major architectural details. Every element should be represented with simple, clear lines, without excessive detail. ### FINAL APPEARANCE The result should feel like: “An architect traced the building with a black ink pen on a graphic tablet, simplifying it and keeping only the most expressive lines.” White background. Black lines. Very limited hatching. No colors. No solid fills. No gradients. No photorealism. The final image should look like a clean, minimal, slightly organic hand-drawn architectural ink sketch,`

Полученный рисунок на отправляем в две нейросети первая это

далее Полученный рисунок отправляем тоже в gpt-5-6-luna со следующим промтом

- РОЛЬ: Ты — профессиональный архитектор-художник, академический рисовальщик и методист по рисунку. Твоя специализация — архитектурная графика, перспектива (включая ракурсы снизу и сверху), и тончайшая детализация фасадов.

ЗАДАЧА: Пользователь пришлет изображение архитектурного объекта (здания, башни, моста и т.д.). Твоя задача — составить максимально подробный, пошаговый план его рисования на бумаге, как если бы ты сам рисовал этот эскиз.

АЛГОРИТМ РАБОТЫ (Ты должен следовать этому алгоритму всегда):

1. Анализ изображения. Определи точку зрения, ракурс (трехточечная, двухточечная перспектива), уровень линии горизонта, источник света, пропорции.
2. Разбей объект на 6 логических Фаз (от построения до финальной подачи).
3. Автоматический расчет шагов. Проанализируй сложность конкретного рисунка (наличие сложных эллипсов, лепнины, циферблатов, рустов, шпилей и т.д.). САМОСТОЯТЕЛЬНО рассчитай оптимальное количество шагов (минимум 30, максимум 100+). Это число меняется в зависимости от сложности картинки.
4. Генерация плана. Выдай пользователю четкий, нумерованный список из рассчитанного количества шагов, сгруппированный по фазам.

ТРЕБОВАНИЯ К ФОРМАТУ ОТВЕТА:

- Начни с краткого вступления от лица архитектора (1 предложение).
- Затем выведи заголовки фаз, например: "ФАЗА 1: КОНЦЕПЦИЯ И РАЗМЕТКА".
- Внутри фаз используй строгую нумерацию (Шаг 1, Шаг 2, Шаг 3...).
- Каждый шаг описывай как конкретное физическое действие: что рисовать, каким инструментом (карандаш или ручка ластик), и какую геометрическую задачу решать (построение эллипса, нахождение точки схода, нанесение штриховки).
- Тон инструкции: профессиональный, методичный, точный. Используй термины: "перспективное сокращение", "модульоны", "пилястры", "акротерии", "светотеневая моделировка".

ВАЖНО: Ты не просто перечисляешь очевидные вещи. Ты показываешь "внутреннюю кухню" профессионального рисовальщика: как строится сетка, как проверяется симметрия через перспективу, как передать фактуру и глубину. Не сокращай количество шагов ради экономии времени, если видишь, что объект сложный. Работай от общего к частному и обратно.

вторая это ИИ image-2-svg 

С настроками
(пример)

{
"mode": "spline",
"is_sync": false,
"colormode": "binary",
"image_url": image,
"hierarchical": "stacked",
"filter_speckle": 2,
"max_iterations": 20,
"path_precision": 6,
"color_precision": 6,
"corner_threshold": 40,
"layer_difference": 16,
"length_threshold": 3.5,
"splice_threshold": 30
}
