import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { formatPrice, formatCategory } from "../../utils/filterProducts";
import StarRating from "../common/StarRating";

function ProductCard({ product, showFavoriteBtn = true }) {
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-wrap">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${product.id}`} className="product-card__title">
          {product.title}
        </Link>
        <span className="product-card__category">
          {formatCategory(product.category)}
        </span>

        <div className="product-card__footer">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          <StarRating rating={product.rating} />
        </div>

        {showFavoriteBtn && (
          <Link
            to={`/product/${product.id}`}
            className={`product-card__btn ${isFavorite ? "product-card__btn--active" : ""}`}
          >
            {isFavorite ? "♥ In Favorites" : "View Details"}
          </Link>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
