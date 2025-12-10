export default function Banner() {
  return (
    <section className="vk-banner mb-3 mb-md-4">
      <span className="vk-badge mb-2">Fresh Deals</span>

      <h2 className="h4 mb-1">Light Green Mega Sale on VK Mart</h2>

      <p className="mb-3 text-muted small">
        Mobiles, electronics, fashion & groceries — everything in one green store.
      </p>

      <div className="d-flex flex-wrap gap-2">
        <button className="btn vk-btn-primary btn-sm">Shop Now</button>
        <button className="btn btn-outline-success btn-sm border-0">
          View Today's Offers →
        </button>
      </div>
    </section>
  );
}
