import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main id="main-content" className="detail-page">
        <p role="alert">Producto no encontrado.</p>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="detail-page">
      <article className="detail-card">
        <img src={product.image} alt={product.name} />
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <ul>
            <li>
              <strong>Categoría:</strong> {product.category}
            </li>
            <li>
              <strong>Origen:</strong> {product.origin}
            </li>
            <li>
              <strong>Material:</strong> {product.material}
            </li>
          </ul>
          <p>
            <strong>${product.price.toFixed(2)}</strong>
          </p>
          <div className="detail-actions">
            <button type="button" onClick={() => addToCart(product)}>
              Añadir al carrito
            </button>
            <Link to="/">Volver al catálogo</Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ProductDetailPage;
