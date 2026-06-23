import ProductCard from "../products/ProductCard";

function SimilarProducts({ products, currentId }) {
  const similar = products.filter((p) => p.id !== currentId).slice(0, 4);

  if (!similar.length) return null;

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">Similar Products</h2>
      <div className="similar-products__grid">
        {similar.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;
