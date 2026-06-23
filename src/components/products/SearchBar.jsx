import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSearch } from '../../store/slices/filtersSlice'

function SearchBar() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.filters.search)
  const [value, setValue] = useState(search)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearch(value))
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search products"
      />
      <button type="submit" className="btn btn--primary search-bar__btn">
        Search
      </button>
    </form>
  )
}

export default SearchBar
