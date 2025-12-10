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
        display: "flex",
        flexDirection: "column",
      }}
      onClick={openDetails}  // ⭐ CLICK → GO DETAILS ⭐
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      <h5 style={{ fontSize: "16px", fontWeight: "600", minHeight: "45px" }}>
        {item.name}
      </h5>

      {/* PRICE */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "18px", color: "#2f7e32", fontWeight: 700 }}>
          ₹{item.price}
        </span>

        <span
          style={{
            textDecoration: "line-through",
            color: "#888",
            fontSize: "14px",
          }}
        >
          ₹{item.originalPrice}
        </span>

        <span style={{ color: "red", fontWeight: "600", fontSize: "14px" }}>
          {item.discountPercent}% OFF
        </span>
      </div>

      {/* BUTTONS (Prevent card click bubbling) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          background: "#2f7e32",
          color: "white",
          marginTop: "10px",
          fontWeight: 600,
        }}
      >
        Add to Cart
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          buyNow();
        }}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #2f7e32",
          background: "white",
          color: "#2f7e32",
          fontWeight: 600,
          marginTop: "5px",
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
