const categories = [
  "All",
  "Mobiles",
  "Electronics",
  "Fashion",
  "Groceries",
  "Home",
  "Beauty",
  "Toys"
];

export default function CategoryBar({ active, onChange }) {
  return (
    <div className="vk-scroll-x pb-2 mb-3">
      <div className="d-inline-flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              "vk-category-pill" + (active === cat ? " active" : "")
            }
            onClick={() => onChange && onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
