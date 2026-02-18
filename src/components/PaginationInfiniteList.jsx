function PaginationInfiniteList({ visibleCount, total, onLoadMore }) {
  const hasMore = visibleCount < total;

  return (
    <div className="pagination-area">
      <p>
        Mostrando {Math.min(visibleCount, total)} de {total} productos
      </p>
      {hasMore ? (
        <button type="button" onClick={onLoadMore}>
          Cargar más
        </button>
      ) : (
        <p role="status">No hay más productos por cargar.</p>
      )}
    </div>
  );
}

export default PaginationInfiniteList;
