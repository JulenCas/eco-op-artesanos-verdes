import { useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import PaginationInfiniteList from '../components/PaginationInfiniteList';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import products from '../data/products.json';

const ITEMS_PER_BATCH = 4;

function CatalogPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersAccordionOpen, setFiltersAccordionOpen] = useState(true);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory =
        activeCategory === 'Todas' || product.category === activeCategory;
      const inQuery =
        normalizedQuery === '' ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.material.toLowerCase().includes(normalizedQuery);
      return inCategory && inQuery;
    });
  }, [activeCategory, query]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleSearch = (value) => {
    setQuery(value);
    setVisibleCount(ITEMS_PER_BATCH);
  };

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
          activeCategory={activeCategory}
          onCategoryChange={handleFilterChange}
        />
      </div>

      <section className="catalog-main" aria-label="Listado de productos">
        <SearchBar value={query} onChange={handleSearch} />

        <div className="product-grid" role="list">
          {visibleProducts.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p role="status">No encontramos productos para tu búsqueda actual.</p>
        )}

        <PaginationInfiniteList
          visibleCount={visibleProducts.length}
          total={filteredProducts.length}
          onLoadMore={() => setVisibleCount((current) => current + ITEMS_PER_BATCH)}
        />
      </section>

      <aside
        id="mobile-filter-panel"
        className={`mobile-filter-panel ${isMobileFiltersOpen ? 'open' : ''}`}
        aria-hidden={!isMobileFiltersOpen}
      >
        <h2>Filtros móviles</h2>
        <button
          type="button"
          className="accordion-trigger"
          aria-expanded={filtersAccordionOpen}
          onClick={() => setFiltersAccordionOpen((current) => !current)}
        >
          Categorías
        </button>
        {filtersAccordionOpen && (
          <FilterSidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleFilterChange}
          />
        )}
      </aside>
    </main>
  );
}

export default CatalogPage;
