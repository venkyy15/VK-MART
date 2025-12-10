import products from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList({ search }) {
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="product-wrapper"
      style={{
        width: "100%",
        padding: "0 10px",
        marginTop: "10px",
        overflow: "hidden", // ⭐ IMPORTANT
        boxSizing: "border-box",
      }}
    >
      <h3
        className="product-title"
        style={{
          marginBottom: "15px",
          fontWeight: "700",
          fontSize: "22px",
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
          gap: "10px",
          width: "100%",
          maxWidth: "100%",
          gridTemplateColumns: "repeat(2, 1fr)", // ⭐ MOBILE S FIX
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
