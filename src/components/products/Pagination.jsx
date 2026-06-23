import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setPage } from '../../store/slices/filtersSlice'
import { getTotalPages } from '../../utils/filterProducts'

function Pagination({ totalItems }) {
  const dispatch = useAppDispatch()
  const { page, perPage } = useAppSelector((state) => state.filters)
  const totalPages = getTotalPages(totalItems, perPage)

  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const visiblePages = pages.length <= 7
    ? pages
    : [1, 2, 3, 4, '...', totalPages]

  return (
    <nav className="pagination" aria-label="Product pagination">
      <button
        type="button"
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
        aria-label="Previous page"
      >
        ‹
      </button>

      {visiblePages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={`pagination__btn ${page === p ? 'pagination__btn--active' : ''}`}
            onClick={() => dispatch(setPage(p))}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        className="pagination__btn"
        disabled={page === totalPages}
        onClick={() => dispatch(setPage(page + 1))}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination
