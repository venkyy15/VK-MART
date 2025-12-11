import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("vkDarkMode") === "true");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("vkUser")) || {};
    setUser(u);

    const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
    setCartCount(cart.length);

    const update = () => {
      const updatedUser = JSON.parse(localStorage.getItem("vkUser")) || {};
      setUser(updatedUser);
      const updatedCart = JSON.parse(localStorage.getItem("vkCart") || "[]");
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", update);
    window.addEventListener("cartUpdated", update);
    window.addEventListener("userUpdated", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cartUpdated", update);
      window.removeEventListener("userUpdated", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("vkDarkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="vk-header" style={{
      background: "var(--accent)",
      padding: "10px 12px",
      position: "sticky",
      top: 0,
      zIndex: 9999,
      width: "100%"
    }}>
      <div className="vk-header-inner" style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        {/* Left: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "white", fontWeight: 800, fontSize: 22 }}>
            VK <span style={{ color: "var(--accent-2)" }}>Mart</span>
          </NavLink>
        </div>

        {/* Middle: Search (full width on mobile) */}
        <div style={{ flex: "1 1 360px", minWidth: 200 }}>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
            aria-label="Search products"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              outline: "none",
              boxSizing: "border-box",
              fontSize: 14,
            }}
          />
        </div>

        {/* Right: user + wishlist + cart + theme */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Wishlist Link */}
          <NavLink to="/wishlist" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
            ♡ Wishlist
          </NavLink>

          {/* Profile / Login */}
          {localStorage.getItem("isLoggedIn") === "true" ? (
            <div className="dropdown" style={{ position: "relative" }}>
              <div className="vk-user-toggle" data-bs-toggle="dropdown" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "white", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="pfp" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontWeight: 700, color: "#444" }}>{user?.name?.[0] || "U"}</span>
                  )}
                </div>
                <span style={{ color: "white", fontWeight: 700 }}>Hi, {user?.name || "User"}</span>
              </div>

              <ul className="dropdown-menu dropdown-menu-end shadow" style={{ right: 0, left: "auto", borderRadius: 10, padding: 8 }}>
                <li><NavLink className="dropdown-item" to="/profile">My Profile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/orders">My Orders</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addresses">My Addresses</NavLink></li>
                <li><hr /></li>
                <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink to="/login" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>Login</NavLink>
              <NavLink to="/signup" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>Signup</NavLink>
            </>
          )}

          {/* Cart */}
          <div style={{ position: "relative" }}>
            <NavLink to="/cart" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>🛒 Cart</NavLink>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: -6,
                right: -10,
                background: "red",
                color: "white",
                padding: "2px 6px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700
              }}>{cartCount}</span>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme" style={{
            border: "none", background: "transparent", color: "white", fontSize: 18, cursor: "pointer"
          }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
