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

      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* RESPONSIVE GRID FIX */}
      <style>{`
        .product-grid {
          display: grid;
          width: 100%;
          gap: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        /* --- MOBILE S (320px) FIX --- */
        @media (max-width: 360px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .product-card {
            padding: 8px !important;
          }
          .product-card img {
            height: 130px !important;   /* FIX CUTTING */
            border-radius: 6px !important;
          }
        }

        /* --- MOBILE M/L (375px–425px) --- */
        @media (min-width: 361px) and (max-width: 599px) {
          .product-card img {
            height: 150px !important;
          }
        }

        /* TABLET 600px → 3 columns */
        @media (min-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .product-card img {
            height: 170px !important;
          }
        }

        /* DESKTOP 992px → 4 columns */
        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .product-card img {
            height: 190px !important;
          }
        }
      `}</style>
    </div>
  );
}
