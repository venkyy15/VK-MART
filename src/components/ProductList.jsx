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

      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* RESPONSIVE FIX */}
      <style>{`
        .product-grid {
          display: grid;
          width: 100%;
          box-sizing: border-box;
          gap: 14px;
          grid-template-columns: repeat(1, 1fr); /* DEFAULT: MOBILE S = 1 */
        }

        /* MOBILE M/L (361px–599px) → 2 per row */
        @media (min-width: 361px) and (max-width: 599px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* TABLET 600px → 3 per row */
        @media (min-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* DESKTOP 992px → 4 per row */
        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
