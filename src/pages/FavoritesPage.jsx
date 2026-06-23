import { useAppSelector } from '../store/hooks'
import FavoriteItem from '../components/favorites/FavoriteItem'
import EmptyFavorites from '../components/favorites/EmptyFavorites'

function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items)

  return (
    <div className="favorites-page">
      <div className="favorites-page__inner container">
        <div className="favorites-page__header">
          <h1 className="favorites-page__title">My Favorites</h1>
          {favorites.length > 0 && (
            <p className="favorites-page__count">
              You have {favorites.length} favorite product{favorites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {favorites.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <div className="favorites-page__list">
            {favorites.map((product) => (
              <FavoriteItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
