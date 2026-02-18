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
        <img src={product.imagen} alt={product.nombre} />
        <div>
          <h1>{product.nombre}</h1>
          <p>{product.descripcion}</p>
          <ul>
            <li>
              <strong>Categoría:</strong> {product.categoria}
            </li>
            <li>
              <strong>Etiquetas:</strong> {product.etiquetas.join(', ')}
            </li>
          </ul>
          <p>
            <strong>${product.precio.toFixed(2)}</strong>
          </p>
          <div className="detail-actions">
            <button type="button" onClick={() => addToCart(product.id)}>
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
