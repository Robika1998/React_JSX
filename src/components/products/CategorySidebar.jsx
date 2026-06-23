import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCategory } from '../../store/slices/filtersSlice'
import { formatCategory } from '../../utils/filterProducts'

function CategorySidebar({ categories }) {
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector((state) => state.filters.category)

  return (
    <aside className="category-sidebar">
      <h3 className="category-sidebar__title">Categories</h3>
      <ul className="category-sidebar__list">
        <li>
          <button
            type="button"
            className={`category-sidebar__item ${
              activeCategory === 'all' ? 'category-sidebar__item--active' : ''
            }`}
            onClick={() => dispatch(setCategory('all'))}
          >
            All
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={`category-sidebar__item ${
                activeCategory === category ? 'category-sidebar__item--active' : ''
              }`}
              onClick={() => dispatch(setCategory(category))}
            >
              {formatCategory(category)}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategorySidebar
