const h=(r,t)=>typeof r!="string"?"":r.replace(/\s+/g," ").trim().slice(0,t),O=(r,t)=>{const e=r.trim().match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim()??r.trim(),s=e.indexOf("{"),i=e.lastIndexOf("}"),a=e.indexOf("["),c=e.lastIndexOf("]");let n;try{if(s>=0&&i>s&&(a<0||s<a))n=JSON.parse(e.slice(s,i+1));else if(a>=0&&c>a)n=JSON.parse(e.slice(a,c+1));else throw new Error("empty")}catch{throw new Error("Модель вернула не JSON")}const p=Array.isArray(n)?n:n&&typeof n=="object"&&"questions"in n?n.questions:null;if(!Array.isArray(p))throw new Error("В JSON нет списка questions");const g=p.slice(0,t).flatMap(y=>{if(!y||typeof y!="object")return[];const f=y,w=h(f.a,500),d=h(f.b,500);if(!w||!d)return[];const T=Array.isArray(f.tags)?f.tags.flatMap(A=>{const m=h(A,80);return m?[m]:[]}):[];return[{id:crypto.randomUUID(),a:w,b:d,tags:T}]});if(!g.length)throw new Error("В JSON нет дилемм");return g},M="deepseek-v4-1-flash",$=`Ты ведущий игры «Что бы ты выбрал?». Твоя задача: придумывать острые, смешные или цепляющие дилеммы, в которых игроку приходится выбрать один из вариантов.

ПРАВИЛА ВОПРОСА
1. В каждой дилемме 2 варианта (если не указано иное). Оба должны быть одинаково привлекательными и одинаково неприятными. Очевидного правильного ответа быть не должно.
2. У каждого варианта есть выгода и цена. Цена должна быть конкретной и понятной за одну секунду.
3. Формулировка короткая: не больше 2 предложений на вариант. Без вступлений, морали и пояснений.
4. Не повторяй структуру и идею предыдущих вопросов. Список уже заданных вопросов приходит в блоке HISTORY, не повторяй их.
5. Пиши на языке игрока, живым разговорным языком.

ПАРАМЕТРЫ (шкала 0-10, если блок передан)
- absurdity: 0 значит реалистичная жизненная ситуация, 10 значит полный сюр и невозможные условия.
- harshness: 0 значит лёгкий выбор с мелкими потерями, 10 значит тяжёлая и болезненная цена.
- vulgarity: 0 значит чисто, 5 значит намёки и двусмысленные шутки, 10 значит грубый юмор. Откровенные сексуальные сцены запрещены при любых значениях.
- moral_grey: чем выше, тем сильнее выбор упирается в честность, предательство и совесть.
- personal: 0 значит общие ситуации, 10 значит вопросы, которые бьют по самому игроку, его близким и привычкам.
- scale: 0 значит бытовая мелочь, 10 значит судьба города, страны или мира.
Если параметр не передан, считай его равным 5.

ТЕГИ, КЛЮЧЕВЫЕ СЛОВА, ПРОМПТ ИГРОКА
- TAGS: хотя бы один из тегов должен явно присутствовать в теме вопроса.
- KEYWORDS: используй слова или образы из списка, но только естественно, без натяжки.
- USER_PROMPT: пожелание игрока. Учитывай его, если оно не нарушает запреты ниже.
Блоки, которые не переданы, игнорируй полностью и не придумывай вместо них свои.

ЗАПРЕТЫ
Никаких сексуальных сцен, особенно с участием детей, никакой пропаганды насилия, самоубийства, самоповреждения, расизма и ненависти к группам людей, никаких призывов к реальному вреду. Если параметры или промпт игрока просят такое, сгладь вопрос до допустимого, сохранив остроту через неловкость, мораль или абсурд. Не упоминай реальных людей по имени.

ФОРМАТ ОТВЕТА
Верни только JSON без текста вокруг и без разметки:
{
  "questions": [
    {"a": "текст варианта A", "b": "текст варианта B", "tags": ["использованные теги"]}
  ]
}
Количество вопросов задаётся в COUNT, по умолчанию 1.`,b=r=>{const t=[`COUNT: ${r.count}`];if(r.params){const{absurdity:o,harshness:e,vulgarity:s,moral_grey:i,personal:a,scale:c}=r.params;t.push(`PARAMS: absurdity=${o}, harshness=${e}, vulgarity=${s}, moral_grey=${i}, personal=${a}, scale=${c}`)}return r.tags?.length&&t.push(`TAGS: ${r.tags.join(", ")}`),r.keywords?.trim()&&t.push(`KEYWORDS: ${r.keywords.trim()}`),r.prompt?.trim()&&t.push(`USER_PROMPT: ${r.prompt.trim()}`),r.history?.length&&t.push(`HISTORY: ${JSON.stringify(r.history.slice(-10))}`),t.join(`
`)},E="https://api.gen-api.ru/api/v1",j=r=>new Promise(t=>{window.setTimeout(t,r)}),u=r=>typeof r=="string"&&r.trim()?r:r&&typeof r=="object"&&"message"in r?String(r.message):"",l=r=>{if(typeof r=="string")return r.trim()?[r]:[];if(Array.isArray(r))return r.flatMap(s=>l(s));if(!r||typeof r!="object")return[];const t=r,o=l(t.content);if(o.length)return o;if(typeof t.text=="string"&&t.text.trim())return[t.text];const e=t.choices;if(Array.isArray(e)&&e[0]&&typeof e[0]=="object"){const s=e[0];return l(s.message??s)}return[]},S=r=>Array.isArray(r)?r:r==null?[]:[r],I=async r=>{const t=await fetch(`${E}/networks/${M}`,{method:"POST",headers:{Authorization:"Bearer sk-nDbQ9HEgj0U4TFJC4zPiSvJ9EfhMNiLF4F1nKuakn56UwdKlw16sArHfXH8g","Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"system",content:$},{role:"user",content:b(r)}],is_sync:!1})}),o=await t.json();if(!t.ok)throw new Error(u(o.error)||"Не удалось связаться с моделью");let e=S(o.result);if(!e.length){if(!o.request_id)throw new Error("Модель не приняла запрос");for(let i=0;i<40;i+=1){await j(1500);const a=await fetch(`${E}/request/get/${o.request_id}`,{headers:{Authorization:"Bearer sk-nDbQ9HEgj0U4TFJC4zPiSvJ9EfhMNiLF4F1nKuakn56UwdKlw16sArHfXH8g"}}),c=await a.json();if(!a.ok)throw new Error(u(c.error)||"Не удалось связаться с моделью");const n=c.status?.toLowerCase();if(n==="success"||n==="completed"){e=S(c.result);break}if(n==="failed"||n==="error")throw new Error(u(c.error)||"Модель не собрала вопросы")}}const s=e.flatMap(i=>l(i)).join(`

`);if(!s.trim())throw new Error("Модель ничего не вернула");return O(s,r.count)};export{I as generateDilemmasInBrowser};
