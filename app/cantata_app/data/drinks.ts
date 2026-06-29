import type { Drink, DrinkMedia } from '~/cantata_app/types';

const IMG_SALTED =
  'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.04.22.png';
const IMG_HALVA = IMG_SALTED;
const IMG_CHEESE =
  'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.16.png';
const IMG_MATCHA =
  'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.27.png';
const IMG_ASSAM =
  'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.35.png';
const IMG_ASSAM_DETAIL =
  'https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.46.png';

export const drinks: Drink[] = [
  {
    id: 'salted-caramel',
    category: 'КАПУЧИНО',
    displayName: 'Крафтовая солёная карамель',
    name: 'КРАФТОВАЯ СОЛЁНАЯ КАРАМЕЛЬ',
    description: 'Авторская солёная карамель, корица.',
    sizes: [{ volume: 400, calories: 252 }],
    pastelAccent: '#F8F4EB',
    image: IMG_SALTED,
    catalogCategory: 'coffee',
    catalogTab: 'cappuccino',
    media: [
      {
        type: 'video',
        src: 'https://storage.yandexcloud.net/junktest/6530753_Coffee%20Woman%20Faceless%20Wellness_By_Content_Kiosk_Artlist_Vertical_HD.mp4',
      },
      {
        type: 'video',
        src: 'https://storage.yandexcloud.net/junktest/6163021_Coffee%20Powder%20Process%20Grounded_By_Dmitrii_Borovikov_Artlist_Vertical_HD.mp4',
      },
      { type: 'image', src: IMG_CHEESE, duration: 4500 },
      { type: 'image', src: IMG_MATCHA, duration: 4500 },
    ],
    basePrice: 320,
  },
  {
    id: 'hvala-halva',
    category: 'ЛАТТЕ',
    displayName: 'Хвала халве',
    name: 'ХВАЛА ХАЛВЕ',
    description: 'Халва, лесной орех, семечки.',
    sizes: [
      { volume: 300, calories: 304 },
      { volume: 400, calories: 424 },
    ],
    image: IMG_HALVA,
    catalogCategory: 'coffee',
    catalogTab: 'latte',
    media: [
      { type: 'image', src: IMG_HALVA },
      { type: 'image', src: IMG_CHEESE, duration: 5000 },
      { type: 'image', src: IMG_MATCHA, duration: 5000 },
    ],
    pastelAccent: '#F5F2DD',
    basePrice: 340,
  },
  {
    id: 'cheese-latte',
    category: 'ЛАТТЕ',
    displayName: 'Сырный латте',
    name: 'СЫРНЫЙ ЛАТТЕ',
    description: 'Настоящий сыр, соль с розой.',
    sizes: [
      { volume: 300, calories: 243 },
      { volume: 400, calories: 310 },
    ],
    image: IMG_CHEESE,
    catalogCategory: 'signature',
    catalogTab: 'latte',
    media: [
      { type: 'image', src: IMG_CHEESE },
      { type: 'image', src: IMG_HALVA, duration: 4500 },
      { type: 'image', src: IMG_MATCHA, duration: 4500 },
    ],
    pastelAccent: '#F8EBEF',
    basePrice: 360,
  },
  {
    id: 'matcha-coconut',
    category: 'МАТЧА',
    displayName: 'На кокосовом',
    name: 'МАТЧА НА КОКОСОВОМ',
    description: 'Матча Удзи, кокосовое молоко.',
    sizes: [{ volume: 300, calories: 114 }],
    image: IMG_MATCHA,
    catalogCategory: 'signature',
    catalogTab: 'matcha',
    media: [
      { type: 'image', src: IMG_MATCHA },
      { type: 'image', src: IMG_ASSAM, duration: 4500 },
      { type: 'image', src: IMG_ASSAM_DETAIL, duration: 4500 },
    ],
    pastelAccent: '#E7F6F2',
    basePrice: 380,
  },
  {
    id: 'assam-secret',
    category: 'АВТОРСКИЙ ЧАЙ',
    displayName: 'Секрет Ассама',
    name: 'СЕКРЕТ АССАМА',
    description: 'Ассам, тоник, маракуйя, лимонный сок. Готовим в холодном виде.',
    sizes: [{ volume: 300, calories: 89 }],
    image: IMG_ASSAM,
    detailImage: IMG_ASSAM_DETAIL,
    catalogCategory: 'tea',
    catalogTab: 'tea',
    media: [
      { type: 'image', src: IMG_ASSAM },
      { type: 'image', src: IMG_ASSAM_DETAIL, duration: 5500 },
      { type: 'image', src: IMG_MATCHA, duration: 4500 },
    ],
    pastelAccent: '#EAF0F9',
    basePrice: 280,
  },
];

export const getDrinkById = (id: string) => drinks.find((drink) => drink.id === id);

export const getDrinkMedia = (drink: Drink): DrinkMedia[] => {
  if (drink.media?.length) {
    return drink.media;
  }

  const fallback = drink.detailImage ?? drink.image;

  if (!fallback) {
    return [];
  }

  return [{ type: 'image', src: fallback }];
};

export const getVolumeLabel = (drink: Drink) =>
  drink.sizes.map((size) => size.volume).join(' / ') + ' мл';

export const getVolumePrice = (drink: Drink, volume: number) => {
  const baseVolume = drink.sizes[0]?.volume ?? 300;

  return Math.round(drink.basePrice * (volume / baseVolume));
};
