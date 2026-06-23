import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCategory, setSort } from "../../store/slices/filtersSlice";
import { formatCategory } from "../../utils/filterProducts";

function FilterBar({ categories }) {
  const dispatch = useAppDispatch();
  const { category, sort } = useAppSelector((state) => state.filters);

  return (
    <div className="filter-bar">
      <div className="filter-bar__field">
        <select
          className="filter-bar__select"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {formatCategory(cat)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <select
          className="filter-bar__select"
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          aria-label="Sort products"
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
