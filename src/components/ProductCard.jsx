export default function ProductCard({ item }) {
  if (!item) return null;

  // ADD TO CART FUNCTION (quantity support)
  const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");
  const index = cart.findIndex((p) => p.id === item.id);
  if (index !== -1) {
  cart[index].qty += 1;
  } else {
  cart.push({ ...item, qty: 1 });
  }
  localStorage.setItem("vkCart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  alert("Added to Cart!");
  };
  // BUY NOW FUNCTION
  const buyNow = () => {
  localStorage.setItem("vkBuyNow", JSON.stringify(item));
  window.location.href = "/checkout";
  };
return (
  <div className="product-card">
  {/* IMAGE WITH DISCOUNT BADGE */}
  <div className="pc-img-box">
  <img
  src={item.image || "/default-product.jpg"}
   alt={item.name}
  className="pc-img"
  />
  {item.discountPercent && (
  <span className="pc-discount-badge">-{item.discountPercent}%</span>
  )}
  </div>
  {/* NAME */}
  <h5 className="pc-name">{item.name}</h5>
  {/* PRICE SECTION */}
  <div className="pc-price-box">
  <span className="pc-price">₹{item.price}</span>
  {item.originalPrice && (
  <>
  <span className="pc-original">₹{item.originalPrice}</span>
  <span className="pc-off">{item.discountPercent}% OFF</span>
          </>
        )}
      </div>
      {/* RATING */}
      <div className="pc-rating">
        ⭐ {item.rating} | {item.reviews} reviews
      </div>
      {/* BUTTONS */}
      <button className="pc-btn-add" onClick={addToCart}>
        Add to Cart
      </button>
      <button className="pc-btn-buy" onClick={buyNow}>
        Buy Now
      </button>
    </div>
  );
}
