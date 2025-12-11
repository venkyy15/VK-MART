import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "", mobile: "", profilePic: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vkUser") || "{}");
    setUser({ ...user, ...data });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, profilePic: reader.result };
      setUser(updated);
      localStorage.setItem("vkUser", JSON.stringify(updated));
      window.dispatchEvent(new Event("userUpdated"));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("vkUser", JSON.stringify(user));
    window.dispatchEvent(new Event("userUpdated"));
    alert("Profile updated!");
  };

  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content" style={{ padding: 14 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ minWidth: 200 }}>
            <img src={user.profilePic || "/default-user.png"} alt="profile" style={{ width: 160, height: 160, borderRadius: 160, objectFit: "cover" }} />
            <input type="file" onChange={handleImageUpload} style={{ marginTop: 8 }} />
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <label>Name</label>
            <input className="form-control mb-2" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <label>Email</label>
            <input className="form-control mb-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <label>Mobile</label>
            <input className="form-control mb-2" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
            <button className="btn vk-btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
