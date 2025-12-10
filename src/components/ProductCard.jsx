export default function ProductCard({ item }) {
  if (!item) return null;

  // ADD TO CART FUNCTION (quantity support)
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    // Check if same product already exists
    const index = cart.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      // Increase quantity
      cart[index].qty += 1;
    } else {
      // First time product add
      cart.push({ ...item, qty: 1 });
    }

    // Save updated cart
    localStorage.setItem("vkCart", JSON.stringify(cart));

    // Update header instantly
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to Cart!");
  };

  // BUY NOW FUNCTION → Direct Checkout
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
        justifyContent: "space-between",
      }}
    >
      {/* PRODUCT IMAGE */}
      <img
        src={item.image || "/default-product.jpg"}
        alt={item.name || "Product"}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      {/* PRODUCT NAME */}
      <h5
        style={{
          fontSize: "16px",
          fontWeight: "600",
          minHeight: "45px",
        }}
      >
        {item.name}
      </h5>

      {/* PRICE */}
      <p
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "#2f7e32",
          marginBottom: "6px",
        }}
      >
        ₹{item.price}
      </p>

      {/* ADD TO CART BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          background: "#2f7e32",
          fontWeight: "600",
          color: "white",
          marginBottom: "5px",
        }}
        onClick={addToCart}
      >
        Add to Cart
      </button>

      {/* BUY NOW BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #2f7e32",
          background: "white",
          color: "#2f7e32",
          fontWeight: "600",
        }}
        onClick={buyNow}
      >
        Buy Now
      </button>
    </div>
  );
}
