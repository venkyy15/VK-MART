import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const selected = products.find((p) => p.id === Number(id));
    setProduct(selected);
    if (selected?.images?.length > 0) {
      setPreviewImage(selected.images[0]);
    }
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  // ADD TO CART
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("vkCart") || "[]");

    const index = cart.findIndex((i) => i.id === product.id);

    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("vkCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart!");
  };

  // BUY NOW
  const buyNow = () => {
    localStorage.setItem("vkBuyNow", JSON.stringify(product));
    window.location.href = "/checkout";
  };

  return (
    <div className="vk-page">
      <Header />

      <main className="vk-content" style={{ padding: "20px" }}>
        <div
          className="product-details-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* TOP SECTION → GALLERY + DETAILS */}
          <div
            className="product-top"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >

            {/* IMAGE + THUMBNAILS */}
            <div>
              <img
                src={previewImage}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "10px",
                }}
              />

              {/* Thumbnails */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {product.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    onClick={() => setPreviewImage(img)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border:
                        previewImage === img
                          ? "2px solid green"
                          : "1px solid #ccc",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: "700" }}>{product.name}</h2>

              <div style={{ marginTop: "5px", fontSize: "14px" }}>
                ⭐ {product.rating} | {product.reviews} reviews
              </div>

              {/* PRICE BLOCK */}
              <div style={{ marginTop: "10px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "green",
                  }}
                >
                  ₹{product.price}
                </span>

                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  ₹{product.originalPrice}
                </span>

                <span
                  style={{ marginLeft: "10px", color: "red", fontWeight: "600" }}
                >
                  {product.discountPercent}% OFF
                </span>
              </div>

              {/* BUY BUTTONS */}
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={addToCart}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "#2f7e32",
                    color: "white",
                    border: "none",
                    fontSize: "17px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  onClick={buyNow}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "white",
                    color: "#2f7e32",
                    border: "2px solid #2f7e32",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div
            className="product-highlights"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4>Highlights</h4>
            <ul>
              {product.highlights?.map((h, i) => (
                <li key={i} style={{ marginTop: "6px" }}>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* DESCRIPTION */}
          <div
            className="product-description"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4>Description</h4>
            <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
              {product.description}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
