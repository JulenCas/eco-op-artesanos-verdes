import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useI18n } from '../context/I18nContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useI18n();
  const favoriteActive = isFavorite(product.id);

  return (
    <article className="product-card">
      <img src={product.imagen} alt={product.nombre} loading="lazy" />
      <div className="product-content">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <p>
          <strong>${product.precio.toFixed(2)}</strong>
        </p>
        <div className="product-actions">
          <button type="button" onClick={() => addToCart(product.id)}>
            {t('addToCart')}
          </button>
          <button
            type="button"
            aria-pressed={favoriteActive}
            onClick={() => toggleFavorite(product.id)}
          >
            {t('favorite')} {favoriteActive ? '★' : '☆'}
          </button>
          <Link to={`/product/${product.id}`}>{t('viewDetail')}</Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
