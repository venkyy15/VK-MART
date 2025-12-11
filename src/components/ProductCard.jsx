import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  const openDetails = () => {
    navigate(`/product/${item.id}`);
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    const index = cart.findIndex((p) => p.id === item.id);
    if (index !== -1) cart[index].qty += 1;
    else cart.push({ ...item, qty: 1 });

    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart!");
  };

  const buyNow = () => {
    localStorage.setItem("vkBuyNow", JSON.stringify(item));
    window.location.href = "/checkout";
  };

  return (
    <div
      className="product-card"
      onClick={openDetails}
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* IMAGE FIX */}
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>

      <h5 style={{ fontSize: "16px", fontWeight: 600, minHeight: "45px" }}>
        {item.name}
      </h5>

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

        <span style={{ color: "red", fontWeight: 600, fontSize: "14px" }}>
          {item.discountPercent}% OFF
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        style={{
          marginTop: "10px",
          padding: "8px",
          width: "100%",
          borderRadius: "6px",
          border: "none",
          background: "#2f7e32",
          color: "white",
          fontWeight: 700,
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
          marginTop: "8px",
          padding: "8px",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #2f7e32",
          background: "#fff",
          color: "#2f7e32",
          fontWeight: 700,
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
