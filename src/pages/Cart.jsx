import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vkCart") || "[]");
    setCart(data);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("vkCart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increase = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decrease = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
      .filter((i) => i.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkoutProduct = (item) => {
    localStorage.setItem("vkBuyNow", JSON.stringify(item));
    navigate("/checkout");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content" style={{ width: "100%", padding: "20px" }}>
        <h2 className="fw-bold mb-4">My Cart</h2>

        {cart.length === 0 ? (
          <h4>Your cart is empty.</h4>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="cart-box"
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* UPDATED TOP ROW → NOW RESPONSIVE */}
              <div className="cart-top-row">
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                    height="100"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <div style={{ color: "green", fontWeight: "bold" }}>
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                {/* UPDATED REMOVE BUTTON */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="cart-remove-btn"
                >
                  Remove
                </button>
              </div>

              {/* Quantity Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => decrease(item.id)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "5px",
                    background: "#2f7e32",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  -
                </button>

                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item.qty}
                </span>

                <button
                  onClick={() => increase(item.id)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "5px",
                    background: "#2f7e32",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  +
                </button>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => checkoutProduct(item)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#2f7e32",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                  border: "none",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          ))
        )}

        {/* TOTAL */}
        {cart.length > 0 && (
          <div style={{ marginTop: "30px", fontSize: "22px", fontWeight: "700" }}>
            Total: ₹{total}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
