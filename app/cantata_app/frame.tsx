import { useCallback, useState } from 'react';

import { addons } from '~/cantata_app/data/addons';
import { getCartCount, getCartItemKey } from '~/cantata_app/data/cart';
import { getDrinkById, getVolumePrice } from '~/cantata_app/data/drinks';
import type {
  CantataScreen,
  CantataTab,
  CartItem,
  CatalogCategory,
  ProductMode,
} from '~/cantata_app/types';

import './cantata.css';

import { CartScreen } from '~/cantata_app/screens/CartScreen';
import { CatalogScreen } from '~/cantata_app/screens/CatalogScreen';
import { HomeScreen } from '~/cantata_app/screens/HomeScreen';
import { ProductScreen } from '~/cantata_app/screens/ProductScreen';

const createCartItemId = () => `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const CantataFrame = () => {
  const [screen, setScreen] = useState<CantataScreen>('home');
  const [activeTab, setActiveTab] = useState<CantataTab>('home');
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [productMode, setProductMode] = useState<ProductMode>('detail');
  const [catalogFilter, setCatalogFilter] = useState<CatalogCategory | undefined>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productOrigin, setProductOrigin] = useState<CantataScreen>('catalog');
  const [screenKey, setScreenKey] = useState(0);

  const selectedDrink = selectedDrinkId ? getDrinkById(selectedDrinkId) : null;
  const cartCount = getCartCount(cart);

  const addToCart = useCallback(
    (drinkId: string, volume?: number, addonIds: string[] = []) => {
      const drink = getDrinkById(drinkId);

      if (!drink) {
        return;
      }

      const resolvedVolume = volume ?? drink.sizes[0]?.volume ?? 300;
      const addonsTotal = addons
        .filter((addon) => addonIds.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0);
      const unitPrice = getVolumePrice(drink, resolvedVolume) + addonsTotal;
      const key = getCartItemKey(drinkId, resolvedVolume, addonIds);

      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            getCartItemKey(item.drinkId, item.volume, item.addonIds) === key,
        );

        if (existing) {
          return prev.map((item) =>
            item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }

        return [
          ...prev,
          {
            id: createCartItemId(),
            drinkId,
            volume: resolvedVolume,
            addonIds,
            quantity: 1,
            unitPrice,
          },
        ];
      });
    },
    [],
  );

  const handleTabChange = (tab: CantataTab) => {
    if (tab === 'stores' || tab === 'profile') {
      return;
    }

    setActiveTab(tab);
    setScreen(tab);
    setScreenKey((prev) => prev + 1);
  };

  const handleOpenCatalog = (category?: CatalogCategory) => {
    setCatalogFilter(category);
    setActiveTab('catalog');
    setScreen('catalog');
    setScreenKey((prev) => prev + 1);
  };

  const handleSelectDrink = (id: string, origin: CantataScreen = screen) => {
    setSelectedDrinkId(id);
    setProductMode('detail');
    setProductOrigin(origin === 'product' ? 'catalog' : origin);
    setScreen('product');
  };

  const handleQuickAdd = (id: string) => {
    addToCart(id);
    setActiveTab('cart');
    setScreen('cart');
  };

  const handleBackFromProduct = () => {
    if (productMode === 'addons') {
      setProductMode('detail');
      return;
    }

    setScreen(productOrigin);
    setActiveTab(productOrigin === 'cart' ? 'cart' : productOrigin === 'home' ? 'home' : 'catalog');
    setSelectedDrinkId(null);
    setProductMode('detail');
    setScreenKey((prev) => prev + 1);
  };

  const handleOrder = () => {
    setProductMode('addons');
  };

  const handleAddToCartFromProduct = (
    drinkId: string,
    volume: number,
    addonIds: string[],
  ) => {
    addToCart(drinkId, volume, addonIds);
    setSelectedDrinkId(null);
    setProductMode('detail');
    setActiveTab('cart');
    setScreen('cart');
    setScreenKey((prev) => prev + 1);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartBack = () => {
    setActiveTab('home');
    setScreen('home');
    setScreenKey((prev) => prev + 1);
  };

  return (
    <div className={`cantata-root relative h-full ${screen === 'product' ? 'overflow-hidden' : ''}`}>
      <div key={screenKey} className='cantata-screen-enter h-full'>
        {screen === 'home' && (
          <HomeScreen
            activeTab={activeTab}
            cartCount={cartCount}
            onTabChange={handleTabChange}
            onOpenCatalog={handleOpenCatalog}
            onSelectDrink={(id) => handleSelectDrink(id, 'home')}
          />
        )}
        {screen === 'catalog' && (
          <CatalogScreen
            activeTab={activeTab}
            cartCount={cartCount}
            initialCategory={catalogFilter}
            onTabChange={handleTabChange}
            onSelectDrink={(id) => handleSelectDrink(id, 'catalog')}
            onQuickAdd={handleQuickAdd}
          />
        )}
        {screen === 'cart' && (
          <CartScreen
            activeTab={activeTab}
            cartCount={cartCount}
            items={cart}
            onTabChange={handleTabChange}
            onBack={handleCartBack}
            onOpenCatalog={() => handleOpenCatalog()}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </div>

      {screen === 'product' && selectedDrink && (
        <div className='absolute inset-0 z-50 h-full overflow-hidden'>
          <ProductScreen
            drink={selectedDrink}
            mode={productMode}
            onBack={handleBackFromProduct}
            onOrder={handleOrder}
            onAddToCart={handleAddToCartFromProduct}
          />
        </div>
      )}
    </div>
  );
};
