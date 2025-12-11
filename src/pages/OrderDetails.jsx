import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vkOrders") || "[]");

    setAllOrders(saved);
    const found = saved.find((o) => o.id.toString() === id.toString());
    setOrder(found);
  }, [id]);

  const cancelOrder = () => {
    const updated = allOrders.map((o) =>
      o.id.toString() === id.toString()
        ? { ...o, status: "Cancelled" }
        : o
    );

    localStorage.setItem("vkOrders", JSON.stringify(updated));
    setOrder({ ...order, status: "Cancelled" });

    alert("Order Cancelled!");
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content">
        <div className="vk-container">
          <h3>Order Details</h3>

          <div className="order-details-box">
            <img src={order.image} alt="" className="order-details-img" />

            <h4>{order.name}</h4>
            <p className="text-success fw-bold">₹{order.price}</p>

            <p>
              Status: <b>{order.status}</b>
            </p>

            {order.status !== "Cancelled" && (
              <button className="btn btn-danger mt-3" onClick={cancelOrder}>
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
