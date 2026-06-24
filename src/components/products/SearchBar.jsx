import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSearch } from '../../store/slices/filtersSlice'
import Search from '../ui/Search'

function SearchBar() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.filters.search)
  const [value, setValue] = useState(search)

  return (
    <Search
      value={value}
      onChange={setValue}
      onSubmit={(query) => dispatch(setSearch(query))}
      placeholder="Search products..."
      buttonText="Search"
      inputProps={{ 'aria-label': 'Search products' }}
    />
  )
}

export default SearchBar
