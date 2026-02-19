import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../context/FavoritesContext';
import { useI18n } from '../context/I18nContext';
import products from '../data/products.json';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { t } = useI18n();

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main id="main-content" className="collection-page">
      <section className="collection-card">
        <h1>{t('favorites')}</h1>

        {favoriteProducts.length === 0 ? (
          <div className="collection-empty-state">
            <p>{t('emptyFavorites')}</p>
            <Link to="/">{t('continueShopping')}</Link>
          </div>
        ) : (
          <div className="product-grid" role="list" aria-label={t('favoritesTitle')}>
            {favoriteProducts.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default FavoritesPage;
