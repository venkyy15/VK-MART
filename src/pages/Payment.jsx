import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Payment.jsx
 * Self-contained Payment page (demo).
 * - Add to src/pages/Payment.jsx
 * - Add route: <Route path="/payment" element={<Payment />} />
 */

export default function Payment() {
  const navigate = useNavigate();

  // Items / total (in real app you'd derive this from checkout state)
  const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
  const buyNow = JSON.parse(localStorage.getItem("vkBuyNow") || "null");
  const items = buyNow ? [buyNow] : cart;
  const total = items.reduce((s, it) => s + it.price * (it.qty || 1), 0);

  // Payment UI state
  const [method, setMethod] = useState("upi"); // 'upi'|'card'|'cod'|'gift'|'emi'
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [giftCode, setGiftCode] = useState("");
  const [giftApplied, setGiftApplied] = useState(false);

  const [emiBank, setEmiBank] = useState("");
  const [emiMonths, setEmiMonths] = useState(3);

  const [processing, setProcessing] = useState(false);

  // simple validation helpers
  const upiValid = useMemo(() => /\w+@\w+/.test(upiId), [upiId]);
  const cardValid = useMemo(
    () =>
      cardName.trim().length >= 2 &&
      /^\d{16}$/.test(cardNumber.replace(/\s+/g, "")) &&
      /^\d{2}\/\d{2}$/.test(cardExpiry) &&
      /^\d{3,4}$/.test(cardCvv),
    [cardName, cardNumber, cardExpiry, cardCvv]
  );

  const payNow = () => {
    // Demo handlers: do a bit of validation, then "place order"
    if (method === "upi") {
      if (!upiVerified) {
        alert("Please verify UPI before paying (demo).");
        return;
      }
    } else if (method === "card") {
      if (!cardValid) {
        alert("Please enter valid card details.");
        return;
      }
    } else if (method === "gift") {
      if (!giftApplied) {
        alert("Please apply gift card/code before paying.");
        return;
      }
    }

    setProcessing(true);

    // Simulate placing order: create vkOrders localStorage entry (same approach as Checkout)
    const orders = JSON.parse(localStorage.getItem("vkOrders") || "[]");
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      paymentMethod: method,
      status: "Order Placed",
    };

    orders.push(order);
    localStorage.setItem("vkOrders", JSON.stringify(orders));

    // clear cart/buynow demo
    localStorage.removeItem("vkBuyNow");
    localStorage.removeItem("vkCart");
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      setProcessing(false);
      navigate("/order-confirm");
    }, 900);
  };

  const verifyUpi = () => {
    if (!upiValid) {
      alert("Enter valid UPI (demo example: yourid@bank)");
      return;
    }
    // demo verify
    setUpiVerified(true);
    alert("UPI verified (demo)");
  };

  const applyGift = () => {
    if (!giftCode.trim()) {
      alert("Enter gift code");
      return;
    }
    // demo: apply
    setGiftApplied(true);
    alert("Gift code applied (demo)");
  };

  // responsive card number formatting helper
  const formatCardNumber = (num) =>
    num
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  return (
    <div className="vk-page">
      <Header />

      {/* STYLES: inline so you can paste directly */}
      <style>{`
        /* Payment page styles - mobile-first */
        .pay-wrapper { max-width: 1100px; margin: 18px auto; padding: 0 12px; }
        .pay-topbar {
          position: sticky; top: 10px; z-index: 40;
          background: white; border-radius: 10px; padding: 12px 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06); display:flex; gap:12px; align-items:center;
          justify-content:space-between; margin-bottom:12px;
        }
        .pay-top-left { display:flex; gap:12px; align-items:center; }
        .pay-total { font-weight:800; font-size:18px; color:#2f7e32; }
        .pay-offer { background:#e8f8ec; padding:8px 10px; border-radius:8px; font-size:13px; color:#197a37; }
        .pay-grid { display:grid; grid-template-columns: 1fr; gap:14px; }

        /* accordion card */
        .pay-card { background: #fff; border-radius:10px; padding:14px; box-shadow: 0 6px 18px rgba(0,0,0,0.04); }
        .pay-section-head { display:flex; justify-content:space-between; gap:12px; align-items:center; cursor:pointer; }
        .method-label { font-weight:700; font-size:16px; display:flex; gap:10px; align-items:center; }
        .small-muted { color:#667; font-size:13px; }
        .divider { height:1px; background: #eee; margin:12px 0; }

        /* inputs */
        .vk-input { width:100%; padding:10px 12px; border-radius:8px; border:1px solid #ddd; outline:none; font-size:14px; }
        .inline-row { display:flex; gap:10px; align-items:center; }
        .inline-row .vk-input { flex:1; }

        /* pay button */
        .pay-actions { display:flex; gap:10px; align-items:center; margin-top:12px; flex-wrap:wrap; }
        .btn { padding:10px 14px; border-radius:8px; border:none; cursor:pointer; font-weight:700; }
        .btn-primary { background:#0b69ff; color:white; }
        .btn-outline { background:transparent; border:1px solid #0b69ff; color:#0b69ff; }
        .btn-ghost { background:#f6f6f6; color:#333; }

        /* order summary card */
        .summary { background:#fff; padding:12px; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.04); }
        .summary .line { display:flex; justify-content:space-between; margin:8px 0; font-weight:700; }
        .summary .items { max-height:240px; overflow:auto; margin-top:8px; padding-right:6px; }

        /* responsive grid for larger screens */
        @media (min-width: 860px) {
          .pay-grid { grid-template-columns: 1fr 360px; align-items:start; }
          .pay-topbar { margin-bottom:18px; }
        }

        /* icons */
        .icon { width:20px; height:20px; display:inline-block; vertical-align:middle; }
      `}</style>

      <main className="vk-content">
        <div className="pay-wrapper">
          {/* TOP BAR */}
          <div className="pay-topbar">
            <div className="pay-top-left">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {/* simple wallet icon */}
                <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="#1976d2" strokeWidth="1.4" fill="#e8f3ff"/>
                  <circle cx="18" cy="12" r="1.6" fill="#1976d2"/>
                </svg>
                <div style={{ fontWeight: 800 }}>Step 3 of 3 — Payments</div>
              </div>

              <div style={{ marginLeft: 12, display: "none" }} className="pay-offer">5% Cashback</div>
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="small-muted">Amount</div>
              <div className="pay-total">₹{total}</div>
            </div>
          </div>

          <div className="pay-grid">
            {/* LEFT: Payment Methods */}
            <div>
              {/* Offers / Promo */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800 }}>Available Offers</div>
                <div className="small-muted" style={{ marginTop: 8 }}>
                  Use code <b>VK5OFF</b> for 5% off (demo). Selected payment offers will show on the final page.
                </div>
              </div>

              {/* UPI */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div
                  className="pay-section-head"
                  onClick={() => setMethod("upi")}
                  role="button"
                >
                  <div className="method-label">
                    {/* UPI icon */}
                    <svg className="icon" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" rx="2" width="20" height="16" fill="#fdeee6" stroke="#ff6b6b"/></svg>
                    UPI
                  </div>
                  <div className="small-muted">{method === "upi" ? "Selected" : "Tap to open"}</div>
                </div>

                {method === "upi" && (
                  <>
                    <div className="divider" />
                    <div style={{ display: "grid", gap: 10 }}>
                      <input
                        className="vk-input"
                        placeholder="Enter UPI ID (yourid@bank)"
                        value={upiId}
                        onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                      />
                      <div className="inline-row">
                        <button className="btn btn-primary" onClick={verifyUpi}>Verify UPI</button>
                        <button className="btn btn-ghost" onClick={() => { setUpiId("demo@vk"); setUpiVerified(true); alert("Demo UPI prefilled"); }}>Use Demo</button>
                        <div style={{ marginLeft: "auto" }} className="small-muted">
                          {upiVerified ? "Verified" : "Not Verified"}
                        </div>
                      </div>

                      <div style={{ fontSize: 13 }} className="small-muted">
                        Verified UPI will be used to process payment. This is demo — no money moves.
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Card */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div className="pay-section-head" onClick={() => setMethod("card")} role="button">
                  <div className="method-label">
                    {/* card icon */}
                    <svg className="icon" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" rx="2" width="20" height="14" fill="#f4f9ff" stroke="#1976d2"/></svg>
                    Credit / Debit / ATM Card
                  </div>
                  <div className="small-muted">{method === "card" ? "Selected" : "Tap to open"}</div>
                </div>

                {method === "card" && (
                  <>
                    <div className="divider" />
                    <div style={{ display: "grid", gap: 10 }}>
                      <input className="vk-input" placeholder="Name on card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                      <input
                        className="vk-input"
                        placeholder="Card number"
                        value={formatCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                      <div style={{ display: "flex", gap: 10 }}>
                        <input className="vk-input" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} style={{ flex: 1 }} />
                        <input className="vk-input" placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} style={{ width: 120 }} />
                      </div>

                      <div style={{ fontSize: 13 }} className="small-muted">
                        Cards are processed via secure gateway (demo). We do not store card details on this demo.
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* COD */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div className="pay-section-head" onClick={() => setMethod("cod")} role="button">
                  <div className="method-label">
                    <svg className="icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#f3fff0" stroke="#2e7d32"/></svg>
                    Cash on Delivery
                  </div>
                  <div className="small-muted">{method === "cod" ? "Selected" : "Tap to open"}</div>
                </div>

                {method === "cod" && (
                  <>
                    <div className="divider" />
                    <div className="small-muted">Pay the amount to the delivery executive. COD surcharge may apply (demo).</div>
                  </>
                )}
              </div>

              {/* Gift Card */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div className="pay-section-head" onClick={() => setMethod("gift")} role="button">
                  <div className="method-label">
                    <svg className="icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#fff5e6" stroke="#ff9800"/></svg>
                    Have a Gift Card?
                  </div>
                  <div className="small-muted">{method === "gift" ? "Selected" : "Tap to open"}</div>
                </div>

                {method === "gift" && (
                  <>
                    <div className="divider" />
                    <div style={{ display: "flex", gap: 10 }}>
                      <input className="vk-input" placeholder="Enter gift card or voucher code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} />
                      <button className="btn btn-outline" onClick={applyGift}>{giftApplied ? "Applied" : "Apply"}</button>
                    </div>
                    {giftApplied && <div style={{ marginTop: 8, color: "#197a37", fontWeight: 700 }}>Gift applied — ₹100 off (demo)</div>}
                  </>
                )}
              </div>

              {/* EMI */}
              <div className="pay-card" style={{ marginBottom: 12 }}>
                <div className="pay-section-head" onClick={() => setMethod("emi")} role="button">
                  <div className="method-label">
                    <svg className="icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#f6f6ff" stroke="#6a1b9a"/></svg>
                    EMI (Monthly installments)
                  </div>
                  <div className="small-muted">{method === "emi" ? "Selected" : "Tap to open"}</div>
                </div>

                {method === "emi" && (
                  <>
                    <div className="divider" />
                    <div style={{ display: "grid", gap: 8 }}>
                      <select className="vk-input" value={emiBank} onChange={(e) => setEmiBank(e.target.value)}>
                        <option value="">Choose bank for EMI</option>
                        <option value="bankA">VK Bank - EMI</option>
                        <option value="bankB">Demo Bank — EMI</option>
                      </select>

                      <div style={{ display: "flex", gap: 8 }}>
                        <select className="vk-input" value={emiMonths} onChange={(e) => setEmiMonths(Number(e.target.value))}>
                          <option value={3}>3 months</option>
                          <option value={6}>6 months</option>
                          <option value={9}>9 months</option>
                          <option value={12}>12 months</option>
                        </select>
                        <div style={{ alignSelf: "center" }} className="small-muted">Estimated EMI per month: ₹{Math.ceil(total / (emiMonths || 1))}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* PAY CTA */}
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-primary"
                    onClick={payNow}
                    disabled={processing}
                    style={{ minWidth: 160 }}
                  >
                    {processing ? "Processing..." : `Pay ₹${total}`}
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      // go back to checkout to change address/payment
                      navigate("/checkout");
                    }}
                  >
                    Change Address / Checkout
                  </button>

                  <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <div className="small-muted">Secure</div>
                    <div style={{ color: "#1976d2", fontWeight: 700 }}>100% Secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Summary */}
            <div>
              <div className="summary">
                <div style={{ fontWeight: 800 }}>Order Summary</div>
                <div className="items" style={{ marginTop: 8 }}>
                  {items.length === 0 && <div className="small-muted">No items</div>}
                  {items.map((it) => (
                    <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                      <img src={it.image} alt={it.name} style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 8 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{it.name}</div>
                        <div style={{ fontSize: 13, color: "#666" }}>Qty: {it.qty || 1}</div>
                      </div>
                      <div style={{ fontWeight: 800 }}>₹{it.price}</div>
                    </div>
                  ))}
                </div>

                <div className="divider" />
                <div className="line"><div>Subtotal</div><div>₹{total}</div></div>
                {giftApplied && <div className="line"><div>Gift Applied</div><div>-₹100</div></div>}
                <div style={{ height: 8 }} />
                <div className="line" style={{ fontSize: 18 }}><div>Total</div><div>₹{giftApplied ? total - 100 : total}</div></div>
                <div style={{ marginTop: 12 }}>
                  <div className="small-muted">Shipping, taxes and payment processing will be calculated on next page (demo)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
