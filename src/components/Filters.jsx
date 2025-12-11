import React, { useState } from "react";

export default function Filters({ onFilter }) {
  const [category, setCategory] = useState("All");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("");

  const apply = () => {
    onFilter({
      category,
      min: min === "" ? null : Number(min),
      max: max === "" ? null : Number(max),
      sort
    });
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
      <select className="form-select" style={{ maxWidth: 160 }} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>All</option>
        <option>Mobiles</option>
        <option>Electronics</option>
        <option>Groceries</option>
        <option>Fashion</option>
        <option>Home</option>
        <option>Beauty</option>
        <option>Toys</option>
      </select>

      <input className="form-control" placeholder="Min" style={{ maxWidth: 90 }} value={min} onChange={(e) => setMin(e.target.value)} />
      <input className="form-control" placeholder="Max" style={{ maxWidth: 90 }} value={max} onChange={(e) => setMax(e.target.value)} />

      <select className="form-select" style={{ maxWidth: 160 }} value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>

      <button className="btn btn-outline-primary" onClick={apply}>Apply</button>
    </div>
  );
}
