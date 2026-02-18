import { createContext, useContext, useMemo } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { DEFAULT_LANGUAGE, translations } from '../i18n/translations';

const CART_STORAGE_KEY = 'artesanos-verdes:cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorageState(CART_STORAGE_KEY, []);

  const addToCart = (productId) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.productId === productId);

      if (existingItem) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.productId === productId);

      if (!existingItem) {
        return current;
      }

      if (existingItem.quantity === 1) {
        return current.filter((item) => item.productId !== productId);
      }

      return current.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, getTotalItems }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(translations[DEFAULT_LANGUAGE].useCartError);
  }

  return context;
}
