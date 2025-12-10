import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  // Navigate to product details page
  const openDetails = () => {
    navigate(`/product/${item.id}`);
  };

  // ADD TO CART FUNCTION
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    const index = cart.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart!");
  };

  // BUY NOW FUNCTION
  const buyNow = () => {
    localStorage.setItem("vkBuyNow", JSON.stringify(item));
    window.location.href = "/checkout";
  };

  return (
    <div
      className="product-card"
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "0.3s",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={openDetails}
    >
      {/* PRODUCT IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      {/* PRODUCT NAME */}
      <h5
        style={{
          fontSize: "15px",
          fontWeight: "600",
          minHeight: "40px",
          lineHeight: "20px",
        }}
      >
        {item.name}
      </h5>

      {/* PRICE SECTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            color: "#2f7e32",
            fontWeight: 700,
          }}
        >
          ₹{item.price}
        </span>

        <span
          style={{
            textDecoration: "line-through",
            color: "#888",
            fontSize: "13px",
          }}
        >
          ₹{item.originalPrice}
        </span>

        <span
          style={{
            color: "red",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {item.discountPercent}% OFF
        </span>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          background: "#2f7e32",
          color: "white",
          fontWeight: 600,
          marginTop: "12px",
        }}
      >
        Add to Cart
      </button>

      {/* BUY NOW BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          buyNow();
        }}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #2f7e32",
          background: "white",
          color: "#2f7e32",
          fontWeight: 600,
          marginTop: "6px",
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
