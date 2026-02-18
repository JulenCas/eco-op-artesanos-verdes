import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import products from '../data/products.json';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main id="main-content" className="detail-page">
        <p role="alert">Producto no encontrado.</p>
        <Link to="/">Volver al catálogo</Link>
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
              <strong>Categoría:</strong> {product.categoria}
            </li>
            <li>
              <strong>Precio:</strong> ${product.precio.toFixed(2)}
            </li>
          </ul>

          <div className="tag-list" aria-label="Etiquetas del producto">
            {product.etiquetas.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button type="button" onClick={() => addToCart(product.id)}>
              Añadir al carrito
            </button>
            <button type="button" aria-pressed={favoriteActive} onClick={() => toggleFavorite(product.id)}>
              Favorito {favoriteActive ? '★' : '☆'}
            </button>
            <Link to="/">Volver al catálogo</Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ProductDetailPage;
