import { Link } from 'react-router-dom'

function EmptyFavorites() {
  return (
    <div className="empty-favorites">
      <div className="empty-favorites__icon">♡</div>
      <h2 className="empty-favorites__title">No favorites yet</h2>
      <p className="empty-favorites__text">
        Add products to your favorites and they will appear here.
      </p>
      <Link to="/" className="btn btn--primary">
        Browse Products
      </Link>
    </div>
  )
}

export default EmptyFavorites
