export default function Footer() {
  return (
    <footer className="vk-footer">
    <div className="footer-container">
    {/* COPYRIGHT */}
    <p className="footer-copy">
    © {new Date().getFullYear()} VK Mart. All rights reserved.
    </p>
    {/* LINKS */}
    <div className="footer-links">
    <a href="#" className="footer-link">Help</a>
    <span className="dot">•</span>
    <a href="#" className="footer-link">Privacy</a>
    <span className="dot">•</span>
    <a href="#" className="footer-link">Terms</a>
    </div>
    </div>
    </footer>
  );
}
