import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useI18n } from '../context/I18nContext';
import products from '../data/products.json';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t, translateCategory, translateTag } = useI18n();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main id="main-content" className="detail-page">
        <p role="alert">{t('productNotFound')}</p>
        <Link to="/">{t('backToCatalog')}</Link>
      </main>
    );
  }

  const favoriteActive = isFavorite(product.id);

  return (
    <main id="main-content" className="detail-page">
      <article className="detail-card">
        <ProductGallery
          nombre={product.nombre}
          imagenPrincipal={product.imagen}
          imagenesAdicionales={product.imagenesAdicionales}
        />

        <div>
          <h1>{product.nombre}</h1>
          <p>{product.descripcion}</p>

          <ul className="detail-meta">
            <li>
              <strong>{t('category')}:</strong> {translateCategory(product.categoria)}
            </li>
            <li>
              <strong>{t('price')}:</strong> ${product.precio.toFixed(2)}
            </li>
          </ul>

          <div className="tag-list" aria-label={t('productTagsAria')}>
            {product.etiquetas.map((tag) => (
              <span key={tag} className="tag-pill">
                {translateTag(tag)}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button type="button" onClick={() => addToCart(product.id)}>
              {t('addToCart')}
            </button>
            <button type="button" aria-pressed={favoriteActive} onClick={() => toggleFavorite(product.id)}>
              {t('favorite')} {favoriteActive ? '★' : '☆'}
            </button>
            <Link to="/">{t('backToCatalog')}</Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ProductDetailPage;
