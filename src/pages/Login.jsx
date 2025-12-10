import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css"; // make sure this exists

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("vkUser"));

    if (!user) {
      alert("Please signup first!");
      return;
    }

    if (email !== user.email || password !== user.password) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    alert("Login Successful!");
    navigate("/");
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content d-flex align-items-center auth-main">
        <div className="container">
          <div className="vk-auth-card">
            <h4 className="mb-3 text-center">Login to VK Mart</h4>

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
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control vk-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="btn vk-btn-primary w-100 mt-2"
            >
              Login
            </button>

            <div className="small text-center mt-3">
              New user? <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
