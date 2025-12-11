import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    const found = orders.find((o) => o.id.toString() === id.toString());
    setOrder(found);
  }, [id]);

  if (!order) {
    return (
      <div className="vk-page">
        <Header />
        <main className="vk-content text-center py-5">
          <h4>Order Not Found</h4>
          <Link to="/orders" className="btn btn-success mt-3">Back to Orders</Link>
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

          <h3 className="mb-3">Order Details</h3>

          <div
            style={{
              background: "var(--card)",
              padding: 15,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* ORDER ITEMS */}
            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                    borderRadius: 8,
                    background: "#f6fff6",
                  }}
                />

                <div>
                  <h5 style={{ margin: 0 }}>{item.name}</h5>
                  <p style={{ margin: 0 }}>Qty: {item.qty || 1}</p>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      color: "#2e7d32",
                    }}
                  >
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}

            {/* ORDER STATUS */}
            <p style={{ fontSize: 16, marginTop: 8 }}>
              <b>Status:</b>{" "}
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

            {/* ADDRESS */}
            <div style={{ marginTop: 15 }}>
              <h5>Delivery Address</h5>
              <p>{order.address.name}</p>
              <p>{order.address.mobile}</p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city} - {order.address.pincode}
              </p>
            </div>

            {/* PAYMENT */}
            <div style={{ marginTop: 15 }}>
              <h5>Payment Method</h5>
              <p>{order.payment}</p>
            </div>

            {/* TOTAL */}
            <div
              style={{
                marginTop: 15,
                padding: "10px 0",
                borderTop: "1px solid #ddd",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Total Amount: ₹{order.total}
            </div>

            <Link to="/orders" className="btn btn-primary mt-3">
              Back to Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
