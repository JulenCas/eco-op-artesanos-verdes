import { useI18n } from '../context/I18nContext';

function SearchBar({ value, onChange }) {
  const { t } = useI18n();

  return (
    <div className="search-bar">
      <label htmlFor="search-input">{t('searchProducts')}</label>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t('searchPlaceholder')}
      />
    </div>
  );
}

export default SearchBar;
