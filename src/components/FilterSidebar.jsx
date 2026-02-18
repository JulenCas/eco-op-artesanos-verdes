import { useId } from 'react';
import { useI18n } from '../context/I18nContext';

function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryToggle,
  tags,
  selectedTags,
  onTagToggle,
  priceRange,
  onPriceChange,
  maxAvailablePrice,
  onResetFilters,
}) {
  const headingId = useId();
  const idPrefix = useId();
  const { t, translateCategory, translateTag } = useI18n();

  return (
    <aside className="filter-sidebar" aria-labelledby={headingId}>
      <div className="filter-header">
        <h2 id={headingId}>{t('filters')}</h2>
        <button type="button" className="secondary-button" onClick={onResetFilters}>
          {t('clear')}
        </button>
      </div>

      <fieldset>
        <legend>{t('categories')}</legend>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
              />
              {translateCategory(category)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>{t('priceRange')}</legend>
        <div className="filter-options">
          <label htmlFor={`${idPrefix}-min-price-input`}>{t('min')}</label>
          <input
            id={`${idPrefix}-min-price-input`}
            type="number"
            min="0"
            max={priceRange.max}
            value={priceRange.min}
            onChange={(event) => onPriceChange('min', event.target.value)}
          />

          <label htmlFor={`${idPrefix}-max-price-input`}>{t('max')}</label>
          <input
            id={`${idPrefix}-max-price-input`}
            type="number"
            min={priceRange.min}
            max={maxAvailablePrice}
            value={priceRange.max}
            onChange={(event) => onPriceChange('max', event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>{t('tags')}</legend>
        <div className="filter-options">
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
              />
              {translateTag(tag)}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default FilterSidebar;
