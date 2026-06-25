export const STAR_LEVELS = [5, 4, 3, 2, 1];

export const FALLBACK_REVIEW_PERCENTS = {
  5: 70,
  4: 20,
  3: 7,
  2: 2,
  1: 1,
};

export function getReviewCount(product) {
  if (product.reviews?.length) {
    return product.reviews.length;
  }
  return Math.floor(product.rating * 30);
}

export function getReviewStarPercents(reviews) {
  if (!reviews?.length) {
    return FALLBACK_REVIEW_PERCENTS;
  }

  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const review of reviews) {
    const star = Math.round(review.rating);
    if (star >= 1 && star <= 5) {
      counts[star]++;
    }
  }

  const total = reviews.length;
  const percents = {};

  for (const star of STAR_LEVELS) {
    percents[star] = Math.round((counts[star] / total) * 100);
  }

  return percents;
}
