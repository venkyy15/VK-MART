export default function ProductCard({ item }) {
  if (!item) return null;

  // ADD TO CART
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    const exist = cart.find((p) => p.id === item.id);

    if (exist) {
      exist.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart!");
  };

  // BUY NOW
  const buyNow = () => {
    localStorage.setItem("vkBuyNow", JSON.stringify(item));
    window.location.href = "/checkout";
  };

  return (
    <div className="product-card">
      
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="pc-img"
      />

      {/* NAME */}
      <h4 className="pc-name">{item.name}</h4>

      {/* PRICE + ORIGINAL PRICE */}
      <div className="pc-price-box">
        <span className="pc-price">₹{item.price}</span>

        {item.originalPrice && (
          <>
            <span className="pc-original">₹{item.originalPrice}</span>
            <span className="pc-discount">
              {Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              )}
              % OFF
            </span>
          </>
        )}
      </div>

      {/* RATINGS */}
      <div className="pc-rating">
        ⭐ {item.rating} | {item.reviews} reviews
      </div>

      {/* BUTTON BOX (Perfect Alignment) */}
      <div className="pc-btn-box">
        <button className="pc-btn-add" onClick={addToCart}>Add to Cart</button>
        <button className="pc-btn-buy" onClick={buyNow}>Buy Now</button>
      </div>
    </div>
  );
}
