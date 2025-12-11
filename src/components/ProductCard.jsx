import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  const openDetails = () => navigate(`/product/${item.id}`);

  const addToCart = (e) => {
    e.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
    const index = cart.findIndex((p) => p.id === item.id);
    if (index !== -1) cart[index].qty += 1;
    else cart.push({ ...item, qty: 1 });
    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart");
  };

  const buyNow = (e) => {
    e.stopPropagation();
    localStorage.setItem("vkBuyNow", JSON.stringify({ ...item, qty: 1 }));
    window.location.href = "/checkout";
  };

  const addToWishlist = (e) => {
    e.stopPropagation();
    const wl = JSON.parse(localStorage.getItem("vkWishlist") || "[]");
    if (!wl.find((x) => x.id === item.id)) {
      wl.push(item);
      localStorage.setItem("vkWishlist", JSON.stringify(wl));
      alert("Added to Wishlist");
    } else alert("Already in Wishlist");
  };

  return (
    <div className="product-card" onClick={openDetails} style={{
      background: "var(--card)",
      borderRadius: 10,
      padding: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      boxSizing: "border-box",
      height: "100%"
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        background: "transparent",
        borderRadius: 8
      }}>
        <img src={item.image || "/default-product.jpg"} alt={item.name}
          style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: 200, borderRadius: 6 }} />
      </div>

      <h5 style={{ fontSize: 15, fontWeight: 700, marginTop: 10, minHeight: 44 }}>{item.name}</h5>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--accent)" }}>₹{item.price}</div>
        {item.originalPrice && <div style={{ textDecoration: "line-through", color: "#888", fontSize: 13 }}>₹{item.originalPrice}</div>}
        {item.discountPercent && <div style={{ color: "#ff4d4f", fontSize: 13, fontWeight: 700 }}>{item.discountPercent}% OFF</div>}
      </div>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={addToCart} style={{
          width: "100%", padding: 9, borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 700
        }}>Add to Cart</button>

        <button onClick={buyNow} style={{
          width: "100%", padding: 9, borderRadius: 8, border: `1px solid var(--accent)`, background: "transparent", color: "var(--accent)", fontWeight: 700
        }}>Buy Now</button>

        <button onClick={addToWishlist} style={{
          width: "100%", padding: 8, borderRadius: 8, border: "1px solid #eee", background: "transparent", color: "#444"
        }}>♡ Wishlist</button>
      </div>
    </div>
  );
}
