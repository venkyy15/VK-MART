import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("vkUser"));
    setUser(u || {});

    const cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
    setCartCount(cart.length);

    const update = () => {
      const updatedUser = JSON.parse(localStorage.getItem("vkUser"));
      setUser(updatedUser || {});

      const updatedCart = JSON.parse(localStorage.getItem("vkCart") || "[]");
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", update);
    window.addEventListener("cartUpdated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cartUpdated", update);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  return (
    <header
      style={{
        background: "#2f7e32",
        padding: "12px 12px 16px",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ width: "100%" }}>
        
        {/* 🔥 ROW 1 — LOGO LEFT & PROFILE/LOGIN RIGHT */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LOGO */}
          <NavLink
            to="/"
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "white",
              textDecoration: "none",
              lineHeight: 1.1,
            }}
          >
            VK <span style={{ color: "#d4ffcf" }}>Mart</span>
          </NavLink>

          {/* PROFILE OR LOGIN/SIGNUP */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {localStorage.getItem("isLoggedIn") === "true" ? (
              <div className="dropdown">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="dropdown"
                >
                  {/* DP */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "white",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "6px",
                    }}
                  >
                    {user?.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span
                        style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
                      >
                        {user?.name?.[0] || "U"}
                      </span>
                    )}
                  </div>

                  {/* HELLO NAME */}
                  <span style={{ color: "white", fontWeight: 600 }}>
                    Hi,{user?.name || "User"}
                  </span>
                </div>

                {/* Dropdown */}
                <ul className="dropdown-menu dropdown-menu-end shadow p-2">
                  <li>
                    <NavLink className="dropdown-item py-2" to="/profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item py-2" to="/orders">
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger py-2" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink style={{ color: "white", fontWeight: 600 }} to="/login">
                  Login
                </NavLink>
                <NavLink style={{ color: "white", fontWeight: 600 }} to="/signup">
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* 🔥 ROW 2 — CART BELOW LOGIN/SIGNUP */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "6px",
            position: "relative",
            paddingRight: "4px",
          }}
        >
          <NavLink
            to="/cart"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            🛒 Cart
          </NavLink>

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "red",
                color: "white",
                padding: "2px 6px",
                borderRadius: "50%",
                fontSize: "11px",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>

        {/* 🔥 ROW 3 — SEARCH BAR */}
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>
    </header>
  );
}
