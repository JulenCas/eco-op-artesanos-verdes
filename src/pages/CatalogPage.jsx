import { useEffect, useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import PaginationInfiniteList from '../components/PaginationInfiniteList';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import products from '../data/products.json';
import { applyProductFilters, sortProducts } from '../utils/filters';

const PAGE_SIZE = 8;

function CatalogPage() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersAccordionOpen, setFiltersAccordionOpen] = useState(true);

  const maxAvailablePrice = useMemo(
    () => Math.max(...products.map((product) => product.precio)),
    []
  );

  const [priceRange, setPriceRange] = useState({ min: 0, max: maxAvailablePrice });

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.categoria))],
    []
  );

  const tags = useMemo(
    () => [...new Set(products.flatMap((product) => product.etiquetas))],
    []
  );

  const filteredProducts = useMemo(
    () =>
      applyProductFilters(products, {
        selectedCategories,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        selectedTags,
        query,
      }),
    [priceRange.max, priceRange.min, query, selectedCategories, selectedTags]
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const shouldPaginate = sortedProducts.length > 20;
  const totalPages = shouldPaginate
    ? Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE))
    : 1;

  const visibleProducts = useMemo(() => {
    if (!shouldPaginate) {
      return sortedProducts;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sortedProducts.slice(start, end);
  }, [currentPage, shouldPaginate, sortedProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategories, selectedTags, sortBy, priceRange.min, priceRange.max]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
          onCategoryToggle={(category) => {
            setSelectedCategories((current) =>
              current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
            );
          }}
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={(tag) => {
            setSelectedTags((current) =>
              current.includes(tag)
                ? current.filter((item) => item !== tag)
                : [...current, tag]
            );
          }}
          priceRange={priceRange}
          onPriceChange={(field, value) => {
            const parsedValue = Number(value);
            setPriceRange((current) => ({
              ...current,
              [field]: Number.isNaN(parsedValue) ? 0 : parsedValue,
            }));
          }}
          maxAvailablePrice={maxAvailablePrice}
        />
      </div>

      <section className="catalog-main" aria-label="Listado de productos">
        <SearchBar value={query} onChange={setQuery} />

        <div className="catalog-toolbar">
          <p role="status">{sortedProducts.length} resultados encontrados</p>
          <label htmlFor="sort-select">
            Ordenar por
            <select
              id="sort-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
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
          Filtros
        </button>
        {filtersAccordionOpen && (
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={(category) => {
              setSelectedCategories((current) =>
                current.includes(category)
                  ? current.filter((item) => item !== category)
                  : [...current, category]
              );
            }}
            tags={tags}
            selectedTags={selectedTags}
            onTagToggle={(tag) => {
              setSelectedTags((current) =>
                current.includes(tag)
                  ? current.filter((item) => item !== tag)
                  : [...current, tag]
              );
            }}
            priceRange={priceRange}
            onPriceChange={(field, value) => {
              const parsedValue = Number(value);
              setPriceRange((current) => ({
                ...current,
                [field]: Number.isNaN(parsedValue) ? 0 : parsedValue,
              }));
            }}
            maxAvailablePrice={maxAvailablePrice}
          />
        )}
      </aside>
    </main>
  );
}

export default CatalogPage;
