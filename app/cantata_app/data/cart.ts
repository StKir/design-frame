import { addons } from '~/cantata_app/data/addons';
import { getDrinkById } from '~/cantata_app/data/drinks';
import type { CartItem } from '~/cantata_app/types';

export const getCartItemKey = (drinkId: string, volume: number, addonIds: string[]) =>
  `${drinkId}:${volume}:${[...addonIds].sort().join(',')}`;

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const getCartItemLabel = (item: CartItem) => {
  const drink = getDrinkById(item.drinkId);

  if (!drink) {
    return '';
  }

  const addonNames = addons
    .filter((addon) => item.addonIds.includes(addon.id))
    .map((addon) => (addon.id === 'cow-milk' ? 'Коровье молоко' : addon.name));

  const options = [item.volume + ' мл', ...addonNames].join(' · ');

  return options;
};

export const getCartDiscount = (items: CartItem[]) => Math.round(getCartTotal(items) * 0.2);

export const getCartPayableTotal = (items: CartItem[]) => getCartTotal(items) - getCartDiscount(items);
