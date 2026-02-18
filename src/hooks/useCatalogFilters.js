import { useEffect, useMemo, useState } from 'react';
import { applyProductFilters, sortProducts } from '../utils/filters';

const PAGE_SIZE = 8;

export default function useCatalogFilters(products) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const maxAvailablePrice = useMemo(
    () => Math.max(...products.map((product) => product.precio)),
    [products]
  );

  const [priceRange, setPriceRange] = useState({ min: 0, max: maxAvailablePrice });

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.categoria))],
    [products]
  );

  const tags = useMemo(
    () => [...new Set(products.flatMap((product) => product.etiquetas))],
    [products]
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
    [products, priceRange.max, priceRange.min, query, selectedCategories, selectedTags]
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

  const updatePriceRange = (field, value) => {
    const parsedValue = Number(value);

    setPriceRange((current) => {
      const nextValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
      const nextRange = { ...current, [field]: nextValue };

      if (field === 'min' && nextRange.min > nextRange.max) {
        nextRange.max = nextRange.min;
      }

      if (field === 'max' && nextRange.max < nextRange.min) {
        nextRange.min = nextRange.max;
      }

      nextRange.min = Math.max(0, nextRange.min);
      nextRange.max = Math.min(maxAvailablePrice, nextRange.max);

      return nextRange;
    });
  };

  const toggleCategory = (category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortBy('default');
    setPriceRange({ min: 0, max: maxAvailablePrice });
  };

  return {
    query,
    setQuery,
    selectedCategories,
    selectedTags,
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
  };
}
