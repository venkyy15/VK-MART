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
        padding: "0px 12px",
        marginTop: "10px",
      }}
    >
      {/* SECTION TITLE */}
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
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
<style>
{`
  .product-grid {
    display: grid;
    gap: 12px;
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* FIX for tiny screens like 320px */
  @media (max-width: 350px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .product-card {
      padding: 8px !important;
    }
    .product-card img {
      height: 120px !important;
    }
  }

  /* TABLET */
  @media (min-width: 600px) {
    .product-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* DESKTOP */
  @media (min-width: 992px) {
    .product-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
`}
</style>


    </div>
  );
}
