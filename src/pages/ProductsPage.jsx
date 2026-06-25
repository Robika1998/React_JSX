import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProducts } from "../store/thunks/productsThunks";
import {
  filterAndSortProducts,
  paginateProducts,
  getCategories,
} from "../utils/filterProducts";
import SearchBar from "../components/products/SearchBar";
import FilterBar from "../components/products/FilterBar";
import CategorySidebar from "../components/products/CategorySidebar";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    if (!items.length) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  const categories = useMemo(() => getCategories(items), [items]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(items, filters),
    [items, filters],
  );

  const paginatedProducts = useMemo(
    () => paginateProducts(filteredProducts, filters.page, filters.perPage),
    [filteredProducts, filters.page, filters.perPage],
  );

  if (loading && !items.length) {
    return <Loader message="Loading products..." />;
  }

  if (error && !items.length) {
    return (
      <ErrorMessage message={error} onRetry={() => dispatch(loadProducts())} />
    );
  }

  return (
    <div className="products-page">
      <div className="products-page__toolbar container">
        <SearchBar />
        <FilterBar categories={categories} />
      </div>

      <div className="products-page__content container">
        <CategorySidebar categories={categories} />

        <div className="products-page__main">
          <div className="products-page__header">
            <h1 className="products-page__title">All Products</h1>
            <p className="products-page__count">
              {filteredProducts.length} products found
            </p>
          </div>

          <ProductGrid products={paginatedProducts} />
          <Pagination totalItems={filteredProducts.length} />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
