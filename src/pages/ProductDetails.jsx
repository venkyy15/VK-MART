import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const p = products.find((x) => String(x.id) === String(id));
    if (!p) { navigate("/"); return; }
    setItem(p);
  }, [id]);

  if (!item) return null;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
    const idx = cart.findIndex((p) => p.id === item.id);
    if (idx !== -1) cart[idx].qty += 1;
    else cart.push({ ...item, qty: 1 });
    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart");
  };

  const buyNow = () => {
    localStorage.setItem("vkBuyNow", JSON.stringify({ ...item, qty: 1 }));
    window.location.href = "/checkout";
  };

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content" style={{ padding: "14px 12px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px", minWidth: 280 }}>
            <div style={{ width: "100%", height: 360, background: "#f7f7f7", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={item.images?.[active] || item.image} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto" }}>
              {(item.images || [item.image]).map((im, idx) => (
                <div key={idx} onClick={() => setActive(idx)} style={{ minWidth: 64, height: 64, borderRadius: 8, border: active === idx ? "2px solid var(--accent)" : "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", padding: 6, cursor: "pointer" }}>
                  <img src={im} alt={`thumb-${idx}`} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 320px", minWidth: 260 }}>
            <h2 style={{ marginTop: 4 }}>{item.name}</h2>

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>₹{item.price}</div>
              {item.originalPrice && <div style={{ textDecoration: "line-through", color: "#888" }}>₹{item.originalPrice}</div>}
              {item.discountPercent && <div style={{ color: "#ff4d4f", fontWeight: 700 }}>{item.discountPercent}% OFF</div>}
            </div>

            <p style={{ marginTop: 12, color: "#333" }}>{item.description}</p>

            <div style={{ marginTop: 12 }}>
              <b>Highlights</b>
              <ul style={{ marginTop: 6 }}>
                {item.highlights?.map((h, i) => <li key={i} style={{ marginBottom: 4 }}>{h}</li>)}
              </ul>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button className="btn vk-btn-primary" onClick={addToCart} style={{ padding: "10px 16px" }}>Add to Cart</button>
              <button className="btn" onClick={buyNow} style={{ padding: "10px 16px", border: "1px solid var(--accent)" }}>Buy Now</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
