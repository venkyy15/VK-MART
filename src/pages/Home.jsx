import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="vk-page">

      {/* HEADER */}
      <Header onSearch={(value) => setSearch(value)} />

      {/* MAIN CONTENT */}
      <main className="vk-content">
        <div className="vk-container">
          <Banner />

          {/* PRODUCT LIST */}
          <div className="product-list-wrapper">
            <ProductList search={search} />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
