import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  if (localStorage.getItem("isLoggedIn") !== "true") return <Navigate to="/login" />;

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("vkUser") || "{}");
    if (user) {
      setName(user.name || "");
      setMobile(user.mobile || "");
    }

    // if buyNow present use that, else use cart
    const buyItem = JSON.parse(localStorage.getItem("vkBuyNow") || "null");
    if (buyItem) setItems([buyItem]);
    else {
      const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
      setItems(cart);
    }

    // default address
    const addrs = JSON.parse(localStorage.getItem("vkAddresses") || "[]");
    const def = addrs.find(a => a.isDefault);
    if (def) {
      setName(def.name); setMobile(def.mobile); setAddress(def.address); setCity(def.city); setPincode(def.pincode);
    }
  }, []);

  const total = items.reduce((s, it) => s + it.price * (it.qty || 1), 0);

  const placeOrder = () => {
    if (!name || !mobile || !address || !city || !pincode) { alert("Please fill address"); return; }
    if (items.length === 0) { alert("No items"); return; }

    const orders = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      address: { name, mobile, address, city, pincode },
      payment,
      status: "Order Placed"
    };

    orders.push(order);
    localStorage.setItem("vkOrders", JSON.stringify(orders));

    localStorage.removeItem("vkBuyNow");
    localStorage.removeItem("vkCart");
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/order-confirm");
  };

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content" style={{ padding: 14 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 600px", minWidth: 300 }}>
            <div style={{ background: "var(--card)", padding: 12, borderRadius: 10 }}>
              <h5>Delivery Address</h5>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input className="form-control" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="form-control" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <textarea className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input className="form-control" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>

              <div style={{ marginTop: 12 }}>
                <h6>Payment Options</h6>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <label><input type="radio" name="pay" checked={payment === "cod"} onChange={() => setPayment("cod")} /> Cash on Delivery</label>
                  <label><input type="radio" name="pay" checked={payment === "upi"} onChange={() => setPayment("upi")} /> UPI / Card (Demo)</label>
                </div>

                {payment === "upi" && (
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <div style={{ width: 180, height: 180, margin: "0 auto", borderRadius: 12, background: "#f6f6f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: 13, textAlign: "center" }}>UPI QR (Demo)</div>
                    </div>
                    <div className="small text-muted mt-2">This is a demo QR — no real payment.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ flex: "0 0 320px", minWidth: 260 }}>
            <div style={{ background: "var(--card)", padding: 12, borderRadius: 10 }}>
              <h5>Order Summary</h5>
              {items.map(it => (
                <div key={it.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <img src={it.image} alt={it.name} style={{ width: 60, height: 60, objectFit: "contain" }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div style={{ fontSize: 13 }}>Qty: {it.qty || 1}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontWeight: 800 }}>₹{it.price}</div>
                </div>
              ))}
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>Total <span>₹{total}</span></div>

              <button className="btn vk-btn-primary w-100" style={{ marginTop: 12 }} onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
