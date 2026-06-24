function StarRating({
  rating,
  size = 'sm',
  variant = 'default',
  reviewCount,
}) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  if (variant === 'inline') {
    return (
      <div className={`star-rating star-rating--inline star-rating--${size}`}>
        <span className="star-rating__icon" aria-hidden="true">★</span>
        <span className="star-rating__value">{rating.toFixed(1)}</span>
        {reviewCount != null && (
          <span className="star-rating__reviews">({reviewCount} reviews)</span>
        )}
      </div>
    )
  }

  return (
    <div className={`star-rating star-rating--${size}`}>
      <div className="star-rating__stars" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star-rating__star ${
              i < fullStars
                ? 'star-rating__star--filled'
                : i === fullStars && hasHalf
                  ? 'star-rating__star--half'
                  : ''
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </div>
  )
}

export default StarRating
