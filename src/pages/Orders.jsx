// ===============================
//      Orders.jsx (FINAL FIXED)
// ===============================

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/orders.css";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Load orders from LocalStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    setOrders(stored);
  }, []);

  // Cancel Order
  const cancelOrder = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    );

    setOrders(updated);
    localStorage.setItem("vkOrders", JSON.stringify(updated));
    alert("Order Cancelled!");
  };

  if (orders.length === 0) {
    return (
      <div className="vk-page">
        <Header />
        <main className="vk-content">
          <div className="container text-center py-5">
            <h4>No Orders Found</h4>
            <Link to="/" className="btn btn-success mt-3">
              Shop Now
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content">
        <div className="container py-3">
          <h3 className="mb-3">Your Orders</h3>

          {orders.map((order) => {
            const firstItem = order.items?.[0]; // 👉 MAIN FIX
            const image =
              firstItem?.image ||
              firstItem?.images?.[0] ||
              "/fallback.png"; // fallback so never breaks

            return (
              <div className="order-card" key={order.id}>
                
                {/* IMAGE */}
                <div className="order-img-box">
                  <img src={image} alt={firstItem?.name} className="order-img" />
                </div>

                {/* DETAILS */}
                <div className="order-info">
                  <h5>{firstItem?.name}</h5>

                  <p className="text-success fw-bold">
                    ₹{order.total}
                  </p>

                  <p className="mb-1">
                    Status:{" "}
                    <span
                      style={{
                        color:
                          order.status === "Pending"
                            ? "orange"
                            : order.status === "Cancelled"
                            ? "red"
                            : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </span>
                  </p>

                  <div className="mt-2 d-flex gap-2">
                    <Link
                      to={`/order/${order.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>

                    {order.status !== "Cancelled" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
