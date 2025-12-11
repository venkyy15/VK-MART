// ===============================
//      Orders.jsx (FINAL FILE)
// ===============================

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/orders.css";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showReason, setShowReason] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [reasonType, setReasonType] = useState("");
  const [customReason, setCustomReason] = useState("");

  // Load orders
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    setOrders(stored);
  }, []);

  // Open reason popup
  const openCancelPopup = (id) => {
    setCancelOrderId(id);
    setReasonType("");
    setCustomReason("");
    setShowReason(true);
  };

  // Confirm cancel
  const confirmCancel = () => {
    if (!reasonType && !customReason.trim()) {
      alert("Please select or enter a reason.");
      return;
    }

    const finalReason = reasonType === "Other" ? customReason : reasonType;

    const updated = orders.map((o) =>
      o.id === cancelOrderId
        ? { ...o, status: "Cancelled", cancelReason: finalReason }
        : o
    );

    setOrders(updated);
    localStorage.setItem("vkOrders", JSON.stringify(updated));

    alert("Order Cancelled!");
    setShowReason(false);
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
            const first = order.items?.[0];
            const image = first?.image || first?.images?.[0] || "/fallback.png";

            return (
              <div className="order-card" key={order.id}>
                {/* IMAGE */}
                <div className="order-img-box">
                  <img src={image} alt={first?.name} className="order-img" />
                </div>

                {/* DETAILS */}
                <div className="order-info">
                  <h5>{first?.name}</h5>

                  <p className="text-success fw-bold">₹{order.total}</p>

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

                  {/* Show reason when cancelled */}
                  {order.cancelReason && (
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      Reason: {order.cancelReason}
                    </p>
                  )}

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
                        onClick={() => openCancelPopup(order.id)}
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

      {/* ================================
          CANCEL REASON POPUP
      ================================= */}
      {showReason && (
        <div
          className="reason-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowReason(false)}
        >
          <div
            className="reason-box"
            style={{
              width: "90%",
              maxWidth: "400px",
              background: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
            onClick={(e) => e.stopPropagation()} // stop close on click inside
          >
            <h5 className="mb-3 text-center">Why are you cancelling?</h5>

            {/* SELECT */}
            <select
              className="form-control mb-3"
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
            >
              <option value="">Choose reason</option>
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Found cheaper elsewhere">Found cheaper elsewhere</option>
              <option value="Delivery taking too long">Delivery taking too long</option>
              <option value="Other">Other (Write below)</option>
            </select>

            {/* TEXTBOX */}
            <textarea
              className="form-control mb-3"
              placeholder="Enter your reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="btn btn-danger w-100 mb-2"
              onClick={confirmCancel}
            >
              Confirm Cancel
            </button>

            <button
              className="btn btn-secondary w-100"
              onClick={() => setShowReason(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
