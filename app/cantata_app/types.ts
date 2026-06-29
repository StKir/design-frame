export type DrinkSize = {
  volume: number;
  calories: number;
};

export type DrinkMedia = {
  type: 'image' | 'video';
  src: string;
  duration?: number;
};

export type CatalogCategory = 'coffee' | 'tea' | 'lemonade' | 'signature' | 'all';

export type Drink = {
  id: string;
  category: string;
  displayName: string;
  name: string;
  description: string;
  sizes: DrinkSize[];
  image: string | null;
  detailImage?: string;
  media?: DrinkMedia[];
  pastelAccent: string;
  basePrice: number;
  catalogCategory: CatalogCategory;
  catalogTab: string;
};

export type Addon = {
  id: string;
  name: string;
  price: number;
};

export type CantataScreen = 'home' | 'catalog' | 'product' | 'cart';

export type CantataTab = 'home' | 'catalog' | 'stores' | 'cart' | 'profile';

export type ProductMode = 'detail' | 'addons';

export type CartItem = {
  id: string;
  drinkId: string;
  volume: number;
  addonIds: string[];
  quantity: number;
  unitPrice: number;
};

export type RecentOrder = {
  drinkId: string;
  label: string;
  priceFrom: number;
};

export type CategoryGridItem = {
  id: CatalogCategory;
  label: string;
  count: number;
  icon: string;
  image?: string;
};

export type CatalogTab = {
  id: string;
  label: string;
  filter: CatalogCategory | 'all';
};
