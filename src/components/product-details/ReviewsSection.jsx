import StarRating from "../common/StarRating";
import Button from "../ui/Button";
import {
  STAR_LEVELS,
  getReviewCount,
  getReviewStarPercents,
} from "../../utils/reviewStats";

function ReviewsSection({ product }) {
  const reviewCount = getReviewCount(product);
  const starPercents = getReviewStarPercents(product.reviews);

  return (
    <section className="product-details__reviews">
      <div className="product-details__reviews-header">
        <h2>Reviews ({reviewCount})</h2>
        <Button variant="outline" size="small">
          Write a Review
        </Button>
      </div>

      <div className="reviews-summary">
        <div className="reviews-summary__score">
          <span className="reviews-summary__number">
            {product.rating.toFixed(1)}
          </span>
          <StarRating rating={product.rating} size="lg" />
        </div>
        <div className="reviews-summary__bars">
          {STAR_LEVELS.map((star) => {
            const percent = starPercents[star];
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
  );
}

export default ReviewsSection;
