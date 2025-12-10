import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderConfirmation() {
  return (
    <div className="vk-page">
      <Header />
      <main className="vk-content d-flex align-items-center py-5">
        <div className="container">
          <div className="vk-auth-card text-center">
            <h4 className="mb-2">Order Confirmed!</h4>
            <p className="text-muted mb-3 small">
              Thank you for shopping with VK Mart. Your order will be delivered soon.
            </p>
            <Link to="/" className="btn vk-btn-primary btn-sm me-2">
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="btn btn-outline-success btn-sm border-0"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
