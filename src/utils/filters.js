export function filterByCategories(products, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) {
    return products;
  }

  return products.filter((product) =>
    selectedCategories.includes(product.categoria)
  );
}

export function filterByPriceRange(products, minPrice, maxPrice) {
  const normalizedMin = Number.isFinite(minPrice) ? minPrice : 0;
  const normalizedMax = Number.isFinite(maxPrice) ? maxPrice : Number.POSITIVE_INFINITY;

  return products.filter(
    (product) => product.precio >= normalizedMin && product.precio <= normalizedMax
  );
}

export function filterByTags(products, selectedTags) {
  if (!selectedTags || selectedTags.length === 0) {
    return products;
  }

  return products.filter((product) =>
    selectedTags.every((tag) => product.etiquetas.includes(tag))
  );
}

export function filterBySearch(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const nombre = product.nombre.toLowerCase();
    const descripcion = product.descripcion.toLowerCase();
    return nombre.includes(normalizedQuery) || descripcion.includes(normalizedQuery);
  });
}

export function sortProducts(products, sortBy) {
  if (!sortBy || sortBy === 'default') {
    return products;
  }

  const sorted = [...products];

  if (sortBy === 'nombre-asc') {
    sorted.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  if (sortBy === 'precio-asc') {
    sorted.sort((a, b) => a.precio - b.precio);
  }

  if (sortBy === 'precio-desc') {
    sorted.sort((a, b) => b.precio - a.precio);
  }

  return sorted;
}

export function applyProductFilters(
  products,
  { selectedCategories, minPrice, maxPrice, selectedTags, query }
) {
  const categoryFiltered = filterByCategories(products, selectedCategories);
  const priceFiltered = filterByPriceRange(categoryFiltered, minPrice, maxPrice);
  const tagsFiltered = filterByTags(priceFiltered, selectedTags);

  return filterBySearch(tagsFiltered, query);
}
