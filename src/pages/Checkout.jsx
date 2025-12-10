import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/checkout.css";

export default function Checkout() {
  // LOGIN CHECK
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" />;
  }

  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("cod");

  // LOAD ITEMS (BuyNow OR Cart)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("vkUser"));
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
    }

    // Check if BUY NOW product exists
    const buyNowItem = JSON.parse(localStorage.getItem("vkBuyNow"));

    if (buyNowItem) {
      setItems([buyNowItem]);
    } 
    else if (location.state?.product) {
      setItems([location.state.product]);
    } 
    else {
      const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
      setItems(cart);
    }
  }, [location.state]);

  // TOTAL CALCULATION
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // PLACE ORDER FUNCTION
  const placeOrder = () => {
    if (!name || !mobile || !address || !city || !pincode) {
      alert("Please fill all address details");
      return;
    }
    if (items.length === 0) {
      alert("No items to order");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("vkOrders") || "[]");

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      address: { name, mobile, address, city, pincode },
      payment,
    };

    orders.push(order);

    // Save orders
    localStorage.setItem("vkOrders", JSON.stringify(orders));

    // Clear BUY NOW
    localStorage.removeItem("vkBuyNow");

    // Clear cart (only when cart checkout)
    if (!localStorage.getItem("vkBuyNow")) {
      localStorage.removeItem("vkCart");
    }

    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/order-confirm");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content">
        <div className="container checkout-container py-3 py-md-4">
          <div className="row g-3 g-md-4">
            
            {/* ADDRESS FORM */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm p-3 p-md-4 checkout-card">
                <h5 className="mb-3">Delivery Address</h5>

                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mobile</label>
                    <input
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <label className="form-label mt-3">Address</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <div className="row g-2 mt-2">
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      className="form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pincode</label>
                    <input
                      className="form-control"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="mb-2">Payment Options</h6>

                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cod"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="upi"
                      checked={payment === "upi"}
                      onChange={() => setPayment("upi")}
                    />
                    <label className="form-check-label" htmlFor="upi">
                      UPI / Netbanking / Card (Demo)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm p-3 p-md-4 checkout-card">
                <h5 className="mb-3">Order Summary</h5>

                <div className="checkout-items">
                  {items.map((it) => (
                    <div key={it.id} className="d-flex mb-2 align-items-center">
                      <img
                        src={it.image}
                        alt={it.name}
                        width="50"
                        height="50"
                        style={{ objectFit: "contain" }}
                      />
                      <div className="ms-2">
                        <div className="small">{it.name}</div>
                        <div className="small fw-semibold">₹{it.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  className="btn vk-btn-primary w-100 mt-3"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
