import Header from "../components/Header";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/orders.css";

export default function Orders() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" />;
  }

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("vkOrders") || "[]");
      if (Array.isArray(saved)) setOrders(saved);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content">
        <div className="container py-3 py-md-4 orders-container">
          <h4 className="mb-3">My Orders</h4>

          {orders.length === 0 && (
            <p className="text-muted">You have no orders yet.</p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="card border-0 shadow-sm p-3 mb-3 order-card"
            >
              <div className="d-flex justify-content-between flex-wrap gap-1">
                <div>
                  <div className="small text-muted">
                    Order ID: {order.id}
                  </div>
                  <div className="small">
                    {new Date(order.date).toLocaleString()}
                  </div>
                </div>
                <div className="vk-price fw-bold">₹{order.total}</div>
              </div>

              <hr />

              {order.items?.map((it, i) => (
                <div className="d-flex mb-2 align-items-center" key={i}>
                  <img
                    src={it.image}
                    width="60"
                    height="60"
                    style={{ objectFit: "contain" }}
                    alt={it.name}
                  />
                  <div className="ms-2">
                    <div className="small fw-semibold order-name-text">
                      {it.name}
                    </div>
                    <div className="small text-muted">₹{it.price}</div>
                  </div>
                </div>
              ))}

              <div className="small mt-2">
                <strong>Deliver to:</strong>{" "}
                {order.address?.name || "Unknown"},{" "}
                {order.address?.city || "Unknown"} –{" "}
                {order.address?.pincode || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
