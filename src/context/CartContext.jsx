import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'artesanos-verdes:cart';
const CartContext = createContext(null);

function readCartFromStorage() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!storedCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

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
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}
