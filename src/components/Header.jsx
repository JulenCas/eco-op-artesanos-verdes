import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

function Header() {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <Link className="brand" to="/">
          Artesanos Verdes
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="menu-list">
            <li>
              <NavLink to="/">Catálogo</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-counters" aria-live="polite">
          <span>Favoritos: {favorites.length}</span>
          <span>Carrito: {totalItems}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
