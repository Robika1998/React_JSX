export const getCategories = (products) => {
  const categories = [...new Set(products.map((p) => p.category))]
  return categories.sort()
}

export const filterAndSortProducts = (products, { search, category, sort }) => {
  let result = [...products]

  if (search.trim()) {
    const query = search.toLowerCase().trim()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    )
  }

  if (category && category !== 'all') {
    result = result.filter((p) => p.category === category)
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  return result
}

export const paginateProducts = (products, page, perPage) => {
  const start = (page - 1) * perPage
  return products.slice(start, start + perPage)
}

export const getTotalPages = (total, perPage) => Math.ceil(total / perPage) || 1

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)

export const formatCategory = (category) =>
  category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
