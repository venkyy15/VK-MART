import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !mobile || !password) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email!");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Please enter a valid 10-digit mobile number!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    const newUser = {
      name,
      email,
      mobile,
      password,
      profilePic: "",
    };

    localStorage.setItem("vkUser", JSON.stringify(newUser));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content d-flex align-items-center auth-main">
        <div className="container">
          <div className="vk-auth-card">
            <h4 className="mb-3 text-center">Create your VK Mart account</h4>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control vk-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control vk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control vk-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control vk-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
            </div>

            <button
              onClick={handleSignup}
              className="btn vk-btn-primary w-100 mt-2"
            >
              Sign Up
            </button>

            <div className="small text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
