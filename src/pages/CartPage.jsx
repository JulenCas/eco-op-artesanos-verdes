import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import products from '../data/products.json';

function CartPage() {
  const { cartItems, addToCart, removeFromCart, getTotalItems } = useCart();
  const { t } = useI18n();

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: item.quantity * product.precio,
      };
    })
    .filter(Boolean);

  const cartTotal = cartProducts.reduce((total, product) => total + product.lineTotal, 0);

  return (
    <main id="main-content" className="collection-page">
      <section className="collection-card">
        <h1>{t('cart')}</h1>

        {cartProducts.length === 0 ? (
          <div className="collection-empty-state">
            <p>{t('emptyCart')}</p>
            <Link to="/">{t('continueShopping')}</Link>
          </div>
        ) : (
          <>
            <ul className="cart-list" aria-label={t('cartTitle')}>
              {cartProducts.map((product) => (
                <li key={product.id} className="cart-row">
                  <img src={product.imagen} alt={product.nombre} loading="lazy" />
                  <div className="cart-row-content">
                    <Link to={`/product/${product.id}`}>{product.nombre}</Link>
                    <p>${product.precio.toFixed(2)}</p>
                  </div>
                  <div className="cart-row-actions">
                    <button type="button" onClick={() => removeFromCart(product.id)}>
                      -
                    </button>
                    <span>{t('quantity')}: {product.quantity}</span>
                    <button type="button" onClick={() => addToCart(product.id)}>
                      +
                    </button>
                  </div>
                  <strong>${product.lineTotal.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <p className="cart-summary">
              {t('cartTotalItems', { count: getTotalItems() })} · {t('price')}: ${cartTotal.toFixed(2)}
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default CartPage;
