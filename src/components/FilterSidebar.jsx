import { useId } from 'react';

function FilterSidebar({ categories, activeCategory, onCategoryChange }) {
  const headingId = useId();

  return (
    <aside className="filter-sidebar" aria-labelledby={headingId}>
      <h2 id={headingId}>Filtros</h2>
      <fieldset>
        <legend>Categoría</legend>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              name="category"
              checked={activeCategory === 'Todas'}
              onChange={() => onCategoryChange('Todas')}
            />
            Todas
          </label>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                checked={activeCategory === category}
                onChange={() => onCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default FilterSidebar;
