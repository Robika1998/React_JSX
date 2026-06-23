import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadProductById,
  loadProducts,
  clearSelectedProduct,
} from "../store/slices/productsSlice";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import { formatPrice, formatCategory } from "../utils/filterProducts";
import StarRating from "../components/common/StarRating";
import SimilarProducts from "../components/product-details/SimilarProducts";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct, items, loading, error } = useAppSelector(
    (state) => state.products,
  );
  const favorites = useAppSelector((state) => state.favorites.items);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const isFavorite = selectedProduct
    ? favorites.some((item) => item.id === selectedProduct.id)
    : false;

  useEffect(() => {
    dispatch(loadProductById(id));
    if (!items.length) {
      dispatch(loadProducts());
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, items.length]);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  const handleToggleFavorite = () => {
    if (!selectedProduct) return;
    dispatch(toggleFavorite(selectedProduct));
  };

  if (loading && !selectedProduct) {
    return <Loader message="Loading product details..." />;
  }

  if (error && !selectedProduct) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(loadProductById(id))}
      />
    );
  }

  if (!selectedProduct) return null;

  const images = selectedProduct.images?.length
    ? selectedProduct.images
    : [selectedProduct.thumbnail];

  const reviewCount = Math.floor(selectedProduct.rating * 30);

  return (
    <div className="product-details">
      <div className="product-details__inner container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>{formatCategory(selectedProduct.category)}</span>
          <span>›</span>
          <span className="breadcrumbs__current">{selectedProduct.title}</span>
        </nav>

        <div className="product-details__hero">
          <div className="product-details__gallery">
            <div className="product-details__thumbnails">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-details__thumb ${
                    activeImage === index
                      ? "product-details__thumb--active"
                      : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img}
                    alt={`${selectedProduct.title} view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
            <div className="product-details__main-image">
              <img src={images[activeImage]} alt={selectedProduct.title} />
            </div>
          </div>

          <div className="product-details__info">
            <span className="product-details__category">
              {formatCategory(selectedProduct.category)}
            </span>
            <h1 className="product-details__title">{selectedProduct.title}</h1>

            <div className="product-details__rating">
              <StarRating rating={selectedProduct.rating} size="lg" />
              <span className="product-details__reviews">
                ({reviewCount} reviews)
              </span>
            </div>

            <p className="product-details__price">
              {formatPrice(selectedProduct.price)}
            </p>

            <p className="product-details__summary">
              {selectedProduct.description}
            </p>

            <div className="product-details__specs">
              <div className="product-details__spec">
                <span>Brand</span>
                <strong>{selectedProduct.brand || "N/A"}</strong>
              </div>
              <div className="product-details__spec">
                <span>Stock</span>
                <strong>{selectedProduct.stock} available</strong>
              </div>
              <div className="product-details__spec">
                <span>Discount</span>
                <strong>
                  {selectedProduct.discountPercentage?.toFixed(1) || 0}%
                </strong>
              </div>
              <div className="product-details__spec">
                <span>Rating</span>
                <strong>{selectedProduct.rating.toFixed(1)} / 5</strong>
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

              <button
                type="button"
                className={`btn btn--primary btn--large ${
                  isFavorite ? "btn--outline" : ""
                }`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
              </button>
            </div>
          </div>
        </div>

        <section className="product-details__description">
          <h2>Description</h2>
          <p>{selectedProduct.description}</p>
          {selectedProduct.warrantyInformation && (
            <p>
              <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
            </p>
          )}
          {selectedProduct.shippingInformation && (
            <p>
              <strong>Shipping:</strong> {selectedProduct.shippingInformation}
            </p>
          )}
        </section>

        <section className="product-details__reviews">
          <div className="product-details__reviews-header">
            <h2>Reviews ({reviewCount})</h2>
            <button type="button" className="btn btn--outline btn--small">
              Write a Review
            </button>
          </div>

          <div className="reviews-summary">
            <div className="reviews-summary__score">
              <span className="reviews-summary__number">
                {selectedProduct.rating.toFixed(1)}
              </span>
              <StarRating rating={selectedProduct.rating} size="lg" />
            </div>
            <div className="reviews-summary__bars">
              {[5, 4, 3, 2, 1].map((star) => {
                const percent =
                  star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 3;
                return (
                  <div key={star} className="reviews-summary__bar-row">
                    <span>{star} ★</span>
                    <div className="reviews-summary__bar">
                      <div
                        className="reviews-summary__bar-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SimilarProducts products={items} currentId={selectedProduct.id} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
