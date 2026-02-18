import { useId } from 'react';

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
}) {
  const headingId = useId();
  const idPrefix = useId();

  return (
    <aside className="filter-sidebar" aria-labelledby={headingId}>
      <h2 id={headingId}>Filtros</h2>

      <fieldset>
        <legend>Categorías</legend>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Rango de precio</legend>
        <div className="filter-options">
          <label htmlFor={`${idPrefix}-min-price-input`}>Mínimo</label>
          <input
            id={`${idPrefix}-min-price-input`}
            type="number"
            min="0"
            max={priceRange.max}
            value={priceRange.min}
            onChange={(event) => onPriceChange('min', event.target.value)}
          />

          <label htmlFor={`${idPrefix}-max-price-input`}>Máximo</label>
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
        <legend>Etiquetas</legend>
        <div className="filter-options">
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default FilterSidebar;
