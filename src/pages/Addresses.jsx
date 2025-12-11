import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Addresses() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("vkAddresses") || "[]"));
  }, []);

  const save = () => {
    if (!name || !mobile || !address || !city || !pincode) { alert("Fill all fields"); return; }
    const newA = { id: Date.now(), name, mobile, address, city, pincode, isDefault: list.length === 0 };
    const updated = [newA, ...list];
    setList(updated);
    localStorage.setItem("vkAddresses", JSON.stringify(updated));
    setName(""); setMobile(""); setAddress(""); setCity(""); setPincode("");
    alert("Saved address");
  };

  const remove = (id) => {
    const updated = list.filter(l => l.id !== id);
    setList(updated);
    localStorage.setItem("vkAddresses", JSON.stringify(updated));
  };

  const makeDefault = (id) => {
    const updated = list.map(l => ({ ...l, isDefault: l.id === id }));
    setList(updated);
    localStorage.setItem("vkAddresses", JSON.stringify(updated));
  };

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content" style={{ padding: 14 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", minWidth: 260 }}>
            <h4>Add Address</h4>
            <input className="form-control mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <textarea className="form-control mb-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input className="form-control mb-2" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input className="form-control mb-2" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <button className="btn vk-btn-primary" onClick={save}>Save Address</button>
          </div>

          <div style={{ flex: "1 1 420px", minWidth: 260 }}>
            <h4>Saved Addresses</h4>
            {list.length === 0 && <p>No addresses added</p>}
            {list.map(l => (
              <div key={l.id} style={{ background: "var(--card)", padding: 12, borderRadius: 8, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{l.name} {l.isDefault && <span style={{ color: "var(--accent)" }}>• Default</span>}</div>
                    <div style={{ fontSize: 14 }}>{l.address}, {l.city} - {l.pincode}</div>
                    <div style={{ fontSize: 13 }}>Mobile: {l.mobile}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => makeDefault(l.id)}>Make Default</button>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(l.id)}>Delete</button>
                  </div>
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
