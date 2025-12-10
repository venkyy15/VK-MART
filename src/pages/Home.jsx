import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="vk-page"
      style={{
        overflowX: "hidden",   // ⭐ FIX main overflow
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      {/* HEADER */}
      <Header onSearch={(value) => setSearch(value)} />

      {/* CONTENT */}
      <main
        className="vk-content"
        style={{
          overflowX: "hidden", // ⭐ Avoid inner overflow
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <div
          className="vk-container"
          style={{
            width: "100%",
            maxWidth: "100%",
            padding: "0",
            margin: "0 auto",
            overflow: "hidden", // ⭐ FIX GRID SHIFT
          }}
        >
          <Banner />

          {/* PRODUCT LIST */}
          <div
            className="product-list-wrapper"
            style={{
              width: "100%",
              overflow: "hidden", // ⭐ 100% FIX
            }}
          >
            <ProductList search={search} />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
