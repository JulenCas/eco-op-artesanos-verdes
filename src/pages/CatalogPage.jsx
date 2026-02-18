import { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import PaginationInfiniteList from '../components/PaginationInfiniteList';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import products from '../data/products.json';
import useCatalogFilters from '../hooks/useCatalogFilters';

function CatalogPage() {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersAccordionOpen, setFiltersAccordionOpen] = useState(true);

  const {
    query,
    setQuery,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    maxAvailablePrice,
    priceRange,
    categories,
    tags,
    sortedProducts,
    visibleProducts,
    shouldPaginate,
    totalPages,
    updatePriceRange,
    toggleCategory,
    toggleTag,
    resetFilters,
    selectedCategories,
    selectedTags,
  } = useCatalogFilters(products);

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      document.body.style.removeProperty('overflow');
      return undefined;
    }

    document.body.style.setProperty('overflow', 'hidden');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.removeProperty('overflow');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileFiltersOpen]);

  return (
    <main id="main-content" className="catalog-layout">
      <button
        type="button"
        className="mobile-filter-trigger"
        aria-controls="mobile-filter-panel"
        aria-expanded={isMobileFiltersOpen}
        onClick={() => setMobileFiltersOpen((current) => !current)}
      >
        {isMobileFiltersOpen ? 'Cerrar filtros' : 'Abrir filtros'}
      </button>

      <div className="desktop-sidebar">
        <FilterSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={toggleCategory}
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          priceRange={priceRange}
          onPriceChange={updatePriceRange}
          maxAvailablePrice={maxAvailablePrice}
          onResetFilters={resetFilters}
        />
      </div>

      <section className="catalog-main" aria-label="Listado de productos">
        <SearchBar value={query} onChange={setQuery} />

        <div className="catalog-toolbar">
          <p role="status">{sortedProducts.length} resultados encontrados</p>
          <label htmlFor="sort-select">
            Ordenar por
            <select id="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="default">Relevancia</option>
              <option value="nombre-asc">Nombre (A-Z)</option>
              <option value="precio-asc">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
            </select>
          </label>
        </div>

        <div className="product-grid" role="list">
          {visibleProducts.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <p role="status">No encontramos productos para tu búsqueda actual.</p>
        )}

        {shouldPaginate && (
          <PaginationInfiniteList
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            visibleCount={visibleProducts.length}
            total={sortedProducts.length}
          />
        )}
      </section>

      {isMobileFiltersOpen && (
        <button
          type="button"
          className="mobile-filter-overlay"
          aria-label="Cerrar panel de filtros"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      <aside
        id="mobile-filter-panel"
        className={`mobile-filter-panel ${isMobileFiltersOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filters-title"
        aria-hidden={!isMobileFiltersOpen}
      >
        <h2 id="mobile-filters-title">Filtros móviles</h2>
        <button
          type="button"
          className="accordion-trigger"
          aria-expanded={filtersAccordionOpen}
          onClick={() => setFiltersAccordionOpen((current) => !current)}
        >
          Filtros
        </button>
        {filtersAccordionOpen && (
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            tags={tags}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            priceRange={priceRange}
            onPriceChange={updatePriceRange}
            maxAvailablePrice={maxAvailablePrice}
            onResetFilters={resetFilters}
          />
        )}
      </aside>
    </main>
  );
}

export default CatalogPage;
