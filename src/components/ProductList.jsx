import products from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList({ search }) {
  // SEARCH FILTER
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="product-wrapper"
      style={{
        width: "100%",
        padding: "10px 15px",
      }}
    >
      {/* SECTION TITLE */}
      <h3
        className="product-title"
        style={{
          marginBottom: "15px",
          fontWeight: "700",
          fontSize: "20px",
          color: "#2f7e32",
        }}
      >
        Top Products
      </h3>

      {/* RESPONSIVE GRID */}
      <div 
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "15px",
          width: "100%",
        }}
      >
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
