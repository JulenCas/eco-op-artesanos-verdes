import { useI18n } from '../context/I18nContext';

function PaginationInfiniteList({
  visibleCount,
  total,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;
  const { t } = useI18n();

  return (
    <div className="pagination-area">
      <p>
        {t('showingPage', {
          visible: visibleCount,
          total,
          current: currentPage,
          pages: totalPages,
        })}
      </p>
      <div className="pagination-controls">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={previousDisabled}
        >
          {t('previous')}
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={nextDisabled}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
}

export default PaginationInfiniteList;
