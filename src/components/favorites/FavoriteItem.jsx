import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { removeFavorite } from '../../store/slices/favoritesSlice'
import { formatPrice, formatCategory } from '../../utils/filterProducts'
import StarRating from '../common/StarRating'

function FavoriteItem({ product }) {
  const dispatch = useAppDispatch()

  const handleRemove = () => {
    dispatch(removeFavorite(product.id))
  }

  return (
    <article className="favorite-item">
      <Link to={`/product/${product.id}`} className="favorite-item__image-link">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="favorite-item__image"
        />
      </Link>

      <div className="favorite-item__info">
        <Link to={`/product/${product.id}`} className="favorite-item__title">
          {product.title}
        </Link>
        <span className="favorite-item__category">
          {formatCategory(product.category)}
        </span>
        <StarRating rating={product.rating} />
      </div>

      <div className="favorite-item__actions">
        <span className="favorite-item__price">{formatPrice(product.price)}</span>
        <button
          type="button"
          className="favorite-item__remove"
          onClick={handleRemove}
          aria-label={`Remove ${product.title} from favorites`}
        >
          🗑
        </button>
      </div>
    </article>
  )
}

export default FavoriteItem
