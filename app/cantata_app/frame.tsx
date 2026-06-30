import { useCallback, useState } from 'react';

import { PhoneFrame } from '~/components/phone-frame';
import { addons, sweetItems } from '~/cantata_app/data/addons';
import { getCartCount, getCartItemKey } from '~/cantata_app/data/cart';
import { getDrinkById, getVolumePrice } from '~/cantata_app/data/drinks';
import type { CantataScreen, CantataTab, CartItem, CatalogCategory } from '~/cantata_app/types';

import './cantata.css';

import { CartScreen } from '~/cantata_app/screens/CartScreen';
import { CatalogSectionsScreen } from '~/cantata_app/screens/CatalogSectionsScreen';
import { CatalogScreen } from '~/cantata_app/screens/CatalogScreen';
import { CheckoutScreen } from '~/cantata_app/screens/CheckoutScreen';
import { HomeScreen } from '~/cantata_app/screens/HomeScreen';
import { IngredientsScreen } from '~/cantata_app/screens/IngredientsScreen';
import { ProductScreen } from '~/cantata_app/screens/ProductScreen';
import { ProductSummaryScreen } from '~/cantata_app/screens/ProductSummaryScreen';
import { SuccessScreen } from '~/cantata_app/screens/SuccessScreen';
import { UpsellScreen } from '~/cantata_app/screens/UpsellScreen';

const createCartItemId = () => `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const noop = () => {};
const noopTab = (_tab: CantataTab) => {};

const previewCart: CartItem[] = [
  {
    id: 'preview-cherry',
    drinkId: 'cherry-patchouli',
    volume: 400,
    addonIds: ['cow-milk', 'brazil-coffee'],
    quantity: 1,
    unitPrice: 430,
  },
  {
    id: 'preview-pear',
    drinkId: 'pear-cappuccino',
    volume: 300,
    addonIds: ['cow-milk'],
    quantity: 1,
    unitPrice: 320,
  },
];

const previewAddonIds = ['oat-milk', 'brazil-coffee', 'cherry-syrup'];

const previewScreens: { id: CantataScreen; label: string }[] = [
  { id: 'home', label: '01 · Главная' },
  { id: 'catalogSections', label: '02 · Каталог · разделы' },
  { id: 'catalog', label: '03 · Каталог · Кофе' },
  { id: 'product', label: '04 · Карточка напитка' },
  { id: 'ingredients', label: '05 · Ингредиенты' },
  { id: 'productSummary', label: '06 · Итог выбора' },
  { id: 'upsell', label: '07 · Допродажа' },
  { id: 'cart', label: '08 · Корзина' },
  { id: 'checkout', label: '09 · Оформление' },
  { id: 'success', label: '10 · Успешная оплата' },
];

export const CantataFrame = () => {
  const [screen, setScreen] = useState<CantataScreen>('home');
  const [activeTab, setActiveTab] = useState<CantataTab>('home');
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>('cherry-patchouli');
  const [selectedVolume, setSelectedVolume] = useState(400);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['cow-milk', 'brazil-coffee']);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [catalogFilter, setCatalogFilter] = useState<CatalogCategory | undefined>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [screenKey, setScreenKey] = useState(0);

  const selectedDrink = getDrinkById(selectedDrinkId) ?? getDrinkById('cherry-patchouli');
  const cartCount = getCartCount(cart);

  const goToScreen = (nextScreen: CantataScreen, nextTab?: CantataTab) => {
    setScreen(nextScreen);

    if (nextTab) {
      setActiveTab(nextTab);
    }

    setScreenKey((prev) => prev + 1);
  };

  const addDrinkToCart = useCallback(
    (drinkId: string, volume: number, addonIds: string[] = [], quantity = 1) => {
      const drink = getDrinkById(drinkId);

      if (!drink) {
        return;
      }

      const addonsTotal = addons
        .filter((addon) => addonIds.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0);
      const unitPrice = getVolumePrice(drink, volume) + addonsTotal;
      const key = getCartItemKey(drinkId, volume, addonIds);

      setCart((prev) => {
        const existing = prev.find(
          (item) => getCartItemKey(item.drinkId, item.volume, item.addonIds) === key,
        );

        if (existing) {
          return prev.map((item) =>
            item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item,
          );
        }

        return [
          ...prev,
          {
            id: createCartItemId(),
            drinkId,
            volume,
            addonIds,
            quantity,
            unitPrice,
          },
        ];
      });
    },
    [],
  );

  const addSweetToCart = (id: string) => {
    const sweet = sweetItems.find((item) => item.id === id);

    if (!sweet) {
      goToScreen('cart', 'cart');
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        id: createCartItemId(),
        drinkId: '',
        volume: 0,
        addonIds: [],
        quantity: 1,
        unitPrice: sweet.price,
        title: sweet.name,
      },
    ]);
    goToScreen('cart', 'cart');
  };

  const handleTabChange = (tab: CantataTab) => {
    if (tab === 'stores' || tab === 'profile') {
      return;
    }

    if (tab === 'catalog') {
      goToScreen('catalogSections', 'catalog');
      return;
    }

    goToScreen(tab, tab);
  };

  const handleOpenCatalog = (category?: CatalogCategory) => {
    setCatalogFilter(category);

    if (category) {
      goToScreen('catalog', 'catalog');
      return;
    }

    goToScreen('catalogSections', 'catalog');
  };

  const handleSelectDrink = (id: string) => {
    const drink = getDrinkById(id);

    if (!drink) {
      return;
    }

    setSelectedDrinkId(id);
    setSelectedVolume(drink.sizes[0]?.volume ?? 300);
    setSelectedAddonIds(['cow-milk', 'brazil-coffee']);
    setSelectedQuantity(1);
    goToScreen('product');
  };

  const handleQuickAdd = (id: string) => {
    const drink = getDrinkById(id);

    if (!drink) {
      return;
    }

    addDrinkToCart(id, drink.sizes[0]?.volume ?? 300);
    goToScreen('cart', 'cart');
  };

  const handleAddSelectionToCart = () => {
    addDrinkToCart(selectedDrinkId, selectedVolume, selectedAddonIds, selectedQuantity);
    goToScreen('upsell');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartBack = () => {
    goToScreen('home', 'home');
  };

  if (!selectedDrink) {
    return null;
  }

  const renderFlowScreen = () => (
    <div
      className={`cantata-root relative h-full ${
        ['product', 'ingredients', 'productSummary', 'upsell'].includes(screen)
          ? 'overflow-hidden'
          : ''
      }`}
    >
      <div key={screenKey} className='cantata-screen-enter h-full'>
        {screen === 'home' && (
          <HomeScreen
            activeTab={activeTab}
            cartCount={cartCount}
            onTabChange={handleTabChange}
            onOpenCatalog={handleOpenCatalog}
            onSelectDrink={handleSelectDrink}
          />
        )}
        {screen === 'catalogSections' && (
          <CatalogSectionsScreen
            activeTab={activeTab}
            cartCount={cartCount}
            onBack={() => goToScreen('home', 'home')}
            onTabChange={handleTabChange}
            onOpenCategory={handleOpenCatalog}
          />
        )}
        {screen === 'catalog' && (
          <CatalogScreen
            activeTab={activeTab}
            cartCount={cartCount}
            initialCategory={catalogFilter}
            onTabChange={handleTabChange}
            onBack={() => goToScreen('catalogSections', 'catalog')}
            onSelectDrink={handleSelectDrink}
            onQuickAdd={handleQuickAdd}
          />
        )}
        {screen === 'cart' && (
          <CartScreen
            items={cart}
            onBack={handleCartBack}
            onOpenCatalog={() => handleOpenCatalog()}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => goToScreen('checkout')}
          />
        )}
        {screen === 'checkout' && (
          <CheckoutScreen
            items={cart}
            onBack={() => goToScreen('cart', 'cart')}
            onPay={() => goToScreen('success')}
          />
        )}
        {screen === 'success' && (
          <SuccessScreen
            items={cart}
            onHome={() => {
              setCart([]);
              goToScreen('home', 'home');
            }}
          />
        )}
      </div>

      {screen === 'product' && selectedDrink && (
        <div className='absolute inset-0 z-50 h-full overflow-hidden'>
          <ProductScreen
            drink={selectedDrink}
            onBack={() => goToScreen('catalog', 'catalog')}
            onChooseIngredients={(volume) => {
              setSelectedVolume(volume);
              goToScreen('ingredients');
            }}
            onAddToCart={(volume) => {
              setSelectedVolume(volume);
              setSelectedAddonIds(['cow-milk', 'brazil-coffee']);
              setSelectedQuantity(1);
              addDrinkToCart(selectedDrink.id, volume, ['cow-milk', 'brazil-coffee']);
              goToScreen('upsell');
            }}
          />
        </div>
      )}

      {screen === 'ingredients' && selectedDrink && (
        <div className='absolute inset-0 z-50 h-full overflow-hidden'>
          <IngredientsScreen
            drink={selectedDrink}
            volume={selectedVolume}
            selectedAddonIds={selectedAddonIds}
            onBack={() => goToScreen('product')}
            onChange={setSelectedAddonIds}
            onContinue={() => goToScreen('productSummary')}
          />
        </div>
      )}

      {screen === 'productSummary' && selectedDrink && (
        <div className='absolute inset-0 z-50 h-full overflow-hidden'>
          <ProductSummaryScreen
            drink={selectedDrink}
            volume={selectedVolume}
            addonIds={selectedAddonIds}
            quantity={selectedQuantity}
            onBack={() => goToScreen('ingredients')}
            onQuantityChange={setSelectedQuantity}
            onAddToCart={handleAddSelectionToCart}
          />
        </div>
      )}

      {screen === 'upsell' && (
        <div className='absolute inset-0 z-50 h-full overflow-hidden'>
          <UpsellScreen
            drink={selectedDrink}
            onAddSweet={addSweetToCart}
            onSkip={() => goToScreen('cart', 'cart')}
          />
        </div>
      )}
    </div>
  );

  const renderPreviewScreen = (previewScreen: CantataScreen) => {
    const previewDrink = selectedDrink;
    const syncedCart = cart.length > 0 ? cart : previewCart;
    const syncedCartCount = getCartCount(syncedCart);
    const syncedCatalogFilter = catalogFilter ?? 'coffee';

    return (
      <div className='cantata-root relative h-full overflow-hidden'>
        {previewScreen === 'home' && (
          <HomeScreen
            activeTab={activeTab}
            cartCount={cartCount}
            onTabChange={noopTab}
            onOpenCatalog={noop}
            onSelectDrink={noop}
          />
        )}
        {previewScreen === 'catalogSections' && (
          <CatalogSectionsScreen
            activeTab='catalog'
            cartCount={syncedCartCount}
            onBack={noop}
            onTabChange={noopTab}
            onOpenCategory={noop}
            hideBack
          />
        )}
        {previewScreen === 'catalog' && (
          <CatalogScreen
            activeTab='catalog'
            cartCount={syncedCartCount}
            initialCategory={syncedCatalogFilter}
            onTabChange={noopTab}
            onBack={noop}
            onSelectDrink={noop}
            onQuickAdd={noop}
          />
        )}
        {previewScreen === 'product' && (
          <ProductScreen
            drink={previewDrink}
            onBack={noop}
            onChooseIngredients={noop}
            onAddToCart={noop}
          />
        )}
        {previewScreen === 'ingredients' && (
          <IngredientsScreen
            drink={previewDrink}
            volume={selectedVolume}
            selectedAddonIds={selectedAddonIds.length > 0 ? selectedAddonIds : previewAddonIds}
            onBack={noop}
            onChange={noop}
            onContinue={noop}
          />
        )}
        {previewScreen === 'productSummary' && (
          <ProductSummaryScreen
            drink={previewDrink}
            volume={selectedVolume}
            addonIds={selectedAddonIds.length > 0 ? selectedAddonIds : previewAddonIds}
            quantity={selectedQuantity}
            onBack={noop}
            onQuantityChange={noop}
            onAddToCart={noop}
          />
        )}
        {previewScreen === 'upsell' && (
          <UpsellScreen drink={previewDrink} onAddSweet={noop} onSkip={noop} />
        )}
        {previewScreen === 'cart' && (
          <CartScreen
            items={syncedCart}
            onBack={noop}
            onOpenCatalog={noop}
            onUpdateQuantity={noop}
            onRemoveItem={noop}
            onCheckout={noop}
          />
        )}
        {previewScreen === 'checkout' && (
          <CheckoutScreen items={syncedCart} onBack={noop} onPay={noop} />
        )}
        {previewScreen === 'success' && <SuccessScreen items={syncedCart} onHome={noop} />}
      </div>
    );
  };

  return (
    <div className='cantata-showcase'>
      <section className='cantata-showcase-section'>
        <h2 className='cantata-showcase-section__title'>Интерактивный flow</h2>
        <PhoneFrame label='Flow · кликабельный сценарий'>{renderFlowScreen()}</PhoneFrame>
      </section>

      <section className='cantata-showcase-section'>
        <h2 className='cantata-showcase-section__title'>Все экраны</h2>
        <div className='cantata-showcase-grid'>
          {previewScreens.map((previewScreen) => (
            <PhoneFrame key={previewScreen.id} label={previewScreen.label}>
              {renderPreviewScreen(previewScreen.id)}
            </PhoneFrame>
          ))}
        </div>
      </section>
    </div>
  );
};
