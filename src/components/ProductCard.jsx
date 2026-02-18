import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.id);

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          <strong>${product.price.toFixed(2)}</strong>
        </p>
        <div className="product-actions">
          <button type="button" onClick={() => addToCart(product)}>
            Añadir al carrito
          </button>
          <button
            type="button"
            aria-pressed={isFavorite}
            onClick={() => toggleFavorite(product.id)}
          >
            {isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
          </button>
          <Link to={`/product/${product.id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
