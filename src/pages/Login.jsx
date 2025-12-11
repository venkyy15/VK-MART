import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FORGOT PASSWORD STATES
  const [showForgot, setShowForgot] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  // LOGIN
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

  // SEND OTP
  const handleSendOTP = () => {
    const user = JSON.parse(localStorage.getItem("vkUser"));

    if (!user || user.email !== fpEmail) {
      alert("Email not found!");
      return;
    }

    const generated = Math.floor(1000 + Math.random() * 9000);
    setOtp(generated.toString());
    setOtpSent(true);

    alert(`Your OTP: ${generated} (Demo Only)`);
  };

  // VERIFY OTP
  const handleVerifyOTP = () => {
    if (enteredOtp !== otp) {
      alert("Invalid OTP!");
      return;
    }

    alert("OTP Verified! Now set your new password.");
    setOtpSent("verified");
  };

  // RESET PASSWORD
  const handleResetPassword = () => {
    const user = JSON.parse(localStorage.getItem("vkUser"));
    user.password = newPass;

    localStorage.setItem("vkUser", JSON.stringify(user));

    alert("Password updated successfully!");
    setShowForgot(false);
    setOtp("");
    setOtpSent(false);
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

            <div
              className="text-end mb-2"
              style={{ fontSize: "14px", cursor: "pointer", color: "#2f7e32" }}
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
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

      {/* -----------------------------------------
          FORGOT PASSWORD POPUP 
      ------------------------------------------- */}
      {showForgot && (
        <div className="fp-overlay">
          <div className="fp-box">
            <h5 className="text-center mb-3">Reset Password</h5>

            {/* STEP 1 — Enter email */}
            {!otpSent && (
              <>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter your registered email"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                />

                <button className="btn btn-success w-100" onClick={handleSendOTP}>
                  Send OTP
                </button>
              </>
            )}

            {/* STEP 2 — Enter OTP */}
            {otpSent === true && (
              <>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />

                <button className="btn btn-success w-100" onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}

            {/* STEP 3 — Set New Password */}
            {otpSent === "verified" && (
              <>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={handleResetPassword}
                >
                  Update Password
                </button>
              </>
            )}

            <button
              className="btn btn-link w-100 mt-3"
              onClick={() => setShowForgot(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
