import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { formatPrice, formatCategory } from "../../utils/filterProducts";
import { getReviewCount } from "../../utils/reviewStats";
import StarRating from "../common/StarRating";
import Button from "../ui/Button";

function ProductInfo({ product }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const [quantity, setQuantity] = useState(1);

  const isFavorite = favorites.some((item) => item.id === product.id);

  useEffect(() => {
    setQuantity(1);
  }, [product.id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <div className="product-details__info">
      <span className="product-details__category">
        {formatCategory(product.category)}
      </span>
      <h1 className="product-details__title">{product.title}</h1>

      <StarRating
        rating={product.rating}
        size="lg"
        variant="inline"
        reviewCount={getReviewCount(product)}
      />

      <p className="product-details__price">{formatPrice(product.price)}</p>

      <p className="product-details__summary">{product.description}</p>

      <div className="product-details__specs">
        <div className="product-details__spec">
          <span>Brand</span>
          <strong>{product.brand || "N/A"}</strong>
        </div>
        <div className="product-details__spec">
          <span>Stock</span>
          <strong>{product.stock} available</strong>
        </div>
        <div className="product-details__spec">
          <span>Discount</span>
          <strong>{product.discountPercentage?.toFixed(1) || 0}%</strong>
        </div>
        <div className="product-details__spec">
          <span>Rating</span>
          <strong>{product.rating.toFixed(1)} / 5</strong>
        </div>
      </div>

      <div className="product-details__actions">
        <div className="quantity-selector">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <Button
          variant={isFavorite ? "outline" : "primary"}
          size="large"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
