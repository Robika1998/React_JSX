import { useEffect, useState } from "react";

function ProductGallery({ product }) {
  const images = product.images?.length
    ? product.images
    : [product.thumbnail];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  return (
    <div className="product-details__gallery">
      <div className="product-details__thumbnails">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            className={`product-details__thumb ${
              activeImage === index ? "product-details__thumb--active" : ""
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={img}
              alt={`${product.title} view ${index + 1}`}
            />
          </button>
        ))}
      </div>
      <div className="product-details__main-image">
        <img src={images[activeImage]} alt={product.title} />
      </div>
    </div>
  );
}

export default ProductGallery;
