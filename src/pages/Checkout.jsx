import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  if (localStorage.getItem("isLoggedIn") !== "true")
    return <Navigate to="/login" />;

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("vkUser") || "{}");
    if (user) {
      setName(user.name || "");
      setMobile(user.mobile || "");
    }

    const buyItem = JSON.parse(localStorage.getItem("vkBuyNow") || "null");
    if (buyItem) setItems([buyItem]);
    else {
      const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
      setItems(cart);
    }

    const addrs = JSON.parse(localStorage.getItem("vkAddresses") || "[]");
    const def = addrs.find((a) => a.isDefault);
    if (def) {
      setName(def.name);
      setMobile(def.mobile);
      setAddress(def.address);
      setCity(def.city);
      setPincode(def.pincode);
    }
  }, []);

  const total = items.reduce((s, it) => s + it.price * (it.qty || 1), 0);

  // 👉 Continue to payment page
  const goToPayment = () => {
    if (!name || !mobile || !address || !city || !pincode) {
      alert("Please fill all address fields.");
      return;
    }

    const deliveryData = {
      name,
      mobile,
      address,
      city,
      pincode,
    };

    localStorage.setItem("vkDelivery", JSON.stringify(deliveryData));
    navigate("/payment");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content" style={{ padding: 14 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          {/* LEFT SIDE — DELIVERY FORM */}
          <div style={{ flex: "1 1 600px", minWidth: 300 }}>
            <div
              style={{
                background: "var(--card)",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <h5 style={{ fontWeight: 700 }}>Step 2 of 3 — Delivery Details</h5>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <input
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="form-control"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <textarea
                  className="form-control"
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <input
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  className="form-control"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>

              {/* 👉 Continue Button */}
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={goToPayment}
              >
                Continue to Payment →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE — SUMMARY */}
          <div style={{ flex: "0 0 320px", minWidth: 260 }}>
            <div
              style={{
                background: "var(--card)",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <h5>Order Summary</h5>

              {items.map((it) => (
                <div
                  key={it.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 6,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div style={{ fontSize: 13 }}>Qty: {it.qty || 1}</div>
                  </div>

                  <strong>₹{it.price}</strong>
                </div>
              ))}

              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                }}
              >
                Total <span>₹{total}</span>
              </div>

              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={() => navigate("/cart")}
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
