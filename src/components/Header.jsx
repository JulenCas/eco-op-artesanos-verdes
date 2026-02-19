import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useI18n } from '../context/I18nContext';

function Header() {
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const { t, language, setLanguage, supportedLanguages } = useI18n();

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <Link className="brand" to="/">
          {t('appName')}
        </Link>
        <nav aria-label={t('navMain')}>
          <ul className="menu-list">
            <li>
              <NavLink to="/">{t('catalog')}</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">{t('favorites')}</NavLink>
            </li>
            <li>
              <NavLink to="/cart">{t('cart')}</NavLink>
            </li>
          </ul>
        </nav>

        <label className="language-switcher" htmlFor="language-select">
          {t('languageLabel')}
          <select
            id="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            {supportedLanguages.map((locale) => (
              <option key={locale.code} value={locale.code}>
                {locale.label}
              </option>
            ))}
          </select>
        </label>

        <div className="header-counters" aria-live="polite">
          <span>{t('favoritesCount', { count: favorites.length })}</span>
          <span>{t('cartCount', { count: getTotalItems() })}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
