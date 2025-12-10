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
        padding: "0px 12px",
        marginTop: "10px",
        boxSizing: "border-box",
      }}
    >
      {/* TITLE */}
      <h3
        style={{
          marginBottom: "15px",
          fontWeight: "700",
          fontSize: "22px",
          color: "#2f7e32",
        }}
      >
        Top Products
      </h3>

      {/* PRODUCT GRID */}
      <div
        className="product-grid"
        style={{
          display: "grid",
          gap: "14px",
          width: "100%",
          boxSizing: "border-box",

          // ⭐ DEFAULT (Mobile S - 320px)
          gridTemplateColumns: "1fr",
        }}
      >
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        /* ⭐ Mobile S: 320px → 1 column */
        @media (max-width: 360px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ⭐ Mobile M/L: 361px–599px → 2 columns */
        @media (min-width: 361px) and (max-width: 599px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ⭐ Tablet: 600px–991px → 3 columns */
        @media (min-width: 600px) and (max-width: 991px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* ⭐ Laptop/Desktop: 992px+ → 4 columns */
        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
