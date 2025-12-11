import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("vkOrders") || "[]");

    // 🔥 Auto-fix old orders missing status
    saved = saved.map((o) => ({
      ...o,
      status: o.status || "Pending", // default status
    }));

    localStorage.setItem("vkOrders", JSON.stringify(saved));

    setOrders(saved.reverse());
  }, []);

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content">
        <div className="container">
          <h3 className="mb-3" style={{ color: "#2f7e32" }}>My Orders</h3>

          {orders.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "18px" }}>
              No orders found.
            </p>
          )}

          <div className="order-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {orders.map((order, index) => (
              <div
                key={index}
                className="order-card"
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* ORDER HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <b>Order #{order.id}</b>

                  <span
                    className={`status-pill status-${
                      (order?.status || "Pending").toLowerCase()
                    }`}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      background:
                        order?.status === "Delivered"
                          ? "#c8f7c5"
                          : order?.status === "Cancelled"
                          ? "#ffdddd"
                          : "#ffeab6",
                      color:
                        order?.status === "Delivered"
                          ? "#257a29"
                          : order?.status === "Cancelled"
                          ? "#a30000"
                          : "#8a6d00",
                    }}
                  >
                    {order?.status || "Pending"}
                  </span>
                </div>

                {/* ITEMS LIST */}
                <div style={{ marginTop: "10px" }}>
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={item.image}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "8px",
                          objectFit: "contain",
                          background: "#f6f6f6",
                        }}
                      />

                      <div>
                        <b style={{ fontSize: "14px" }}>{item.name}</b>
                        <p style={{ margin: 0, fontSize: "13px", color: "#2f7e32" }}>
                          ₹{item.price} × {item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAL PRICE */}
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: "600",
                    marginTop: "5px",
                    fontSize: "16px",
                  }}
                >
                  Total: ₹{order.total}
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
