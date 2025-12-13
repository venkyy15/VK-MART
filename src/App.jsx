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
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Tracking from "./pages/Tracking";
import Addresses from "./pages/Addresses";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Payment Page */}
      <Route path="/payment" element={<Payment />} />

      {/* Checkout System */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirm" element={<OrderConfirmation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order/:id" element={<OrderDetails />} />

      {/* Product Details */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Wishlist */}
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Tracking */}
      <Route path="/tracking" element={<Tracking />} />

      {/* Address Page */}
      <Route path="/addresses" element={<Addresses />} />
    </Routes>
  );
}
