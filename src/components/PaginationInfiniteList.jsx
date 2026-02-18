function PaginationInfiniteList({
  visibleCount,
  total,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="pagination-area">
      <p>
        Mostrando {visibleCount} de {total} productos (página {currentPage} de {totalPages})
      </p>
      <div className="pagination-controls">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={previousDisabled}
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={nextDisabled}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default PaginationInfiniteList;
