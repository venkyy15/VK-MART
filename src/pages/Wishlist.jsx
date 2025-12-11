import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem("vkWishlist") || "[]");
    setItems(wl);
  }, []);

  const removeItem = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("vkWishlist", JSON.stringify(updated));
  };

  const moveToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    const exist = cart.find((c) => c.id === item.id);
    if (exist) exist.qty += 1;
    else cart.push({ ...item, qty: 1 });

    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    removeItem(item.id);
    nav("/cart");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content" style={{ padding: 14 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3>My Wishlist</h3>

          {items.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: 12,
                  background: "var(--card)",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontWeight: 700, color: "var(--accent)" }}>
                    ₹{item.price}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button
                    className="btn vk-btn-primary"
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
