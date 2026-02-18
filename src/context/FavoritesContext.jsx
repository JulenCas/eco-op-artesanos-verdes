import { createContext, useContext, useMemo } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { DEFAULT_LANGUAGE, translations } from '../i18n/translations';

const FAVORITES_STORAGE_KEY = 'artesanos-verdes:favorites';
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorageState(FAVORITES_STORAGE_KEY, []);

  const toggleFavorite = (productId) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(translations[DEFAULT_LANGUAGE].useFavoritesError);
  }

  return context;
}
