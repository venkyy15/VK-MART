import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";

// ⭐ NEW IMPORT (VERY IMPORTANT)
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />

      {/* Orders Page */}
      <Route path="/orders" element={<Orders />} />

      {/* Order Confirmation */}
      <Route path="/order-confirm" element={<OrderConfirmation />} />

      {/* ⭐ PRODUCT DETAILS PAGE ROUTE (NEWLY ADDED) */}
      <Route path="/product/:id" element={<ProductDetails />} />

    </Routes>
  );
}
