import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    const found = allOrders.find((o) => String(o.id) === String(id));
    setOrder(found || null);
  }, [id]);

  if (!order) {
    return (
      <div className="vk-page">
        <Header />
        <main className="vk-content text-center py-5">
          <h3>Order not found</h3>
          <Link className="btn btn-success mt-3" to="/orders">
            Back to Orders
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const firstItem = order.items?.[0] || {};
  const image =
    firstItem.image || firstItem.images?.[0] || "/fallback.png";

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content" style={{ padding: 15 }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            background: "var(--card)",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <h3 className="mb-3">Order Details</h3>

          {/* PRODUCT IMAGE */}
          <div style={{ textAlign: "center" }}>
            <img
              src={image}
              alt={firstItem.name}
              style={{
                width: "100%",
                maxWidth: 350,
                borderRadius: 12,
                objectFit: "contain",
              }}
            />
          </div>

          {/* PRODUCT INFO */}
          <div style={{ marginTop: 15 }}>
            <h4>{firstItem.name}</h4>
            <p style={{ fontWeight: 700, color: "green" }}>₹{order.total}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    order.status === "Cancelled"
                      ? "red"
                      : order.status === "Pending"
                      ? "orange"
                      : "green",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* ORDER TRACKING */}
          <div style={{ marginTop: 25 }}>
            <h5>Order Tracking</h5>

            <ul style={{ lineHeight: 1.8 }}>
              <li>Order Placed</li>
              <li>Packed</li>
              <li>Shipped</li>
              <li>Out for Delivery</li>
              <li>Delivered</li>
            </ul>
          </div>

          {/* ADDRESS DETAILS */}
          <div style={{ marginTop: 25 }}>
            <h5>Delivery Address</h5>

            <div style={{ lineHeight: 1.8 }}>
              <p><strong>{order.address.name}</strong></p>
              <p>{order.address.mobile}</p>
              <p>{order.address.address}</p>
              <p>{order.address.city} - {order.address.pincode}</p>
            </div>
          </div>

          {/* BACK BUTTON */}
          <div style={{ marginTop: 25 }}>
            <Link className="btn btn-primary" to="/orders">
              Back to Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
