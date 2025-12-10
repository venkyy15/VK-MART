import products from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList({ search }) {
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-wrapper">
      <h3 className="product-title">Top Products</h3>

      <div className="product-grid">
        {filteredProducts
          .filter(Boolean)
          .map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
