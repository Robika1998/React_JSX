import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductById, loadProducts } from "../store/thunks/productsThunks";
import { clearSelectedProduct } from "../store/slices/productsSlice";
import { formatCategory } from "../utils/filterProducts";
import ProductGallery from "../components/product-details/ProductGallery";
import ProductInfo from "../components/product-details/ProductInfo";
import ReviewsSection from "../components/product-details/ReviewsSection";
import SimilarProducts from "../components/product-details/SimilarProducts";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct, items, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(loadProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!items.length) {
      dispatch(loadProducts());
    }
  }, [dispatch]);

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
          <ProductGallery product={selectedProduct} />
          <ProductInfo product={selectedProduct} />
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

        <ReviewsSection product={selectedProduct} />
        <SimilarProducts products={items} currentId={selectedProduct.id} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
