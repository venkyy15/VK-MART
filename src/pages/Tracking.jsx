import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const STEPS = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function Tracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    const o = all.find((x) => String(x.id) === String(id));
    if (!o) return navigate("/orders");
    setOrder(o);
  }, [id]);

  if (!order) return null;

  const currIndex = Math.max(0, STEPS.indexOf(order.status || "Order Placed"));

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content" style={{ padding: 14 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h3>Tracking — Order #{order.id}</h3>

          <div style={{ marginTop: 18 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 999,
                  background: i <= currIndex ? "var(--accent)" : "#e6e6e6",
                  boxShadow: i <= currIndex ? "0 0 0 6px rgba(47,126,50,0.08)" : "none"
                }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{s}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{i <= currIndex ? "Completed" : "Pending"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
