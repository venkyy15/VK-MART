import { useEffect, useState } from "react";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "",
  });

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    email: "",
    pincode: "",
    state: "",
    city: "",
    district: "",
    house: "",
    street: "",
    landmark: "",
    type: "Home",
  });

  const [saved, setSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Load user + address from localStorage
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("vkUser"));
    const a = JSON.parse(localStorage.getItem("vkAddress"));

    if (u) setUser(u);
    if (a) setAddress(a);
  }, []);

  // Save PROFILE Info
  const saveProfile = () => {
    localStorage.setItem("vkUser", JSON.stringify(user));
    setProfileSaved(true);

    // Reset tick after 2 seconds
    setTimeout(() => setProfileSaved(false), 2000);

    // Refresh header username
    window.dispatchEvent(new Event("storage"));
  };

  // Save ADDRESS Info
  const saveAddress = () => {
    localStorage.setItem("vkAddress", JSON.stringify(address));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Upload Profile Image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, profilePic: reader.result };
      setUser(updated);
      localStorage.setItem("vkUser", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-wrapper">

      {/* LEFT — PROFILE INFO */}
      <div className="profile-card">
        <h3>My Profile</h3>

        <img
          src={
            user.profilePic || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="profile"
          className="profile-image"
        />

        <input type="file" onChange={handleImageUpload} className="file-input" />

        <label className="mt-3 fw-semibold">Full Name</label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <label className="mt-2 fw-semibold">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label className="mt-2 fw-semibold">Mobile</label>
        <input
          type="text"
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
        />

        <button
          className={`save-btn profile-save ${profileSaved ? "saved" : ""}`}
          onClick={saveProfile}
        >
          {profileSaved ? "✔ Saved" : "Save Changes"}
        </button>
      </div>

      {/* RIGHT — ADDRESS FORM */}
      <div className="address-card">
        <button
          className="close-btn"
          onClick={() => (window.location.href = "/")}
        >
          ✖
        </button>

        <h3>Add / Edit Address</h3>

        <label>Full Name *</label>
        <input
          value={address.fullname}
          onChange={(e) => setAddress({ ...address, fullname: e.target.value })}
        />

        <div className="row">
          <div className="col">
            <label>Phone *</label>
            <input
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />
          </div>
          <div className="col">
            <label>Email *</label>
            <input
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Pincode *</label>
            <input
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
          <div className="col">
            <label>State *</label>
            <input
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
          </div>
        </div>

        <label>City *</label>
        <input
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />

        <label>District *</label>
        <input
          value={address.district}
          onChange={(e) =>
            setAddress({ ...address, district: e.target.value })
          }
        />

        <label>House No / Building *</label>
        <input
          value={address.house}
          onChange={(e) => setAddress({ ...address, house: e.target.value })}
        />

        <label>Street / Area *</label>
        <input
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />

        <label>Landmark (Optional)</label>
        <input
          value={address.landmark}
          onChange={(e) =>
            setAddress({ ...address, landmark: e.target.value })
          }
        />

        {/* ADDRESS TYPE */}
        <div className="address-type-box">
          <button
            className={`address-type ${address.type === "Home" ? "active" : ""}`}
            onClick={() => setAddress({ ...address, type: "Home" })}
          >
            🏠 Home
          </button>
          <button
            className={`address-type ${address.type === "Work" ? "active" : ""}`}
            onClick={() => setAddress({ ...address, type: "Work" })}
          >
            🏢 Work
          </button>
        </div>

        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={saveAddress}
        >
          {saved ? "✔ Saved" : "Save Address"}
        </button>
      </div>
    </div>
  );
}
