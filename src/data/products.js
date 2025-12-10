const products = [
  // -------------------- MOBILES --------------------
  {
    id: 1,
    name: "iPhone 17 Pro Max 5G",
    category: "Mobiles",
    price: 18999,
    originalPrice: 25999,
    discountPercent: 27,
    rating: 4.3,
    reviews: 234,
    image: "/images/mobiles/Iphone 17 pro max 5G.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    category: "Mobiles",
    price: 79999,
    originalPrice: 99999,
    discountPercent: 20,
    rating: 4.8,
    reviews: 412,
    image: "/images/mobiles/Samsung Galaxy S23 Ultra.jpg"
  },
  {
    id: 3,
    name: "Realme Narzo 60 Pro",
    category: "Mobiles",
    price: 23999,
    originalPrice: 28999,
    discountPercent: 17,
    rating: 4.5,
    reviews: 310,
    image: "/images/mobiles/Realme Narzo 60 Pro.jpg"
  },

  // -------------------- ELECTRONICS --------------------
  {
    id: 4,
    name: "VU Ultra HD TV 50",
    category: "Electronics",
    price: 32999,
    originalPrice: 42999,
    discountPercent: 23,
    rating: 4.5,
    reviews: 121,
    image: "/images/electronics/VU Ultra HD TV 50.jpg"
  },
  {
    id: 5,
    name: "Apple Breeze Wireless Earbuds",
    category: "Electronics",
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    rating: 4.2,
    reviews: 542,
    image: "/images/electronics/airpods.jpg"
  },
  {
    id: 6,
    name: "HP Nitro Gaming Laptop",
    category: "Electronics",
    price: 58999,
    originalPrice: 69999,
    discountPercent: 16,
    rating: 4.4,
    reviews: 87,
    image: "/images/electronics/HP Nitro Gaming Laptop.jpg"
  },
  {
    id: 7,
    name: "Boat Bluetooth Speaker Mini",
    category: "Electronics",
    price: 899,
    originalPrice: 1299,
    discountPercent: 31,
    rating: 4.1,
    reviews: 254,
    image: "/images/electronics/Boat Bluetooth Speaker Mini.jpg"
  },
  {
    id: 8,
    name: "Apple Smart Watch Active",
    category: "Electronics",
    price: 2499,
    originalPrice: 3499,
    discountPercent: 28,
    rating: 4.3,
    reviews: 204,
    image: "/images/electronics/Apple Smart Watch Active.jpg"
  },
  {
    id: 9,
    name: "Dell Cooling Stand",
    category: "Electronics",
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    rating: 4.0,
    reviews: 73,
    image: "/images/electronics/Dell Laptop Cooling Stand.jpg"
  },
  {
    id: 10,
    name: "HP USB Mechanical Keyboard",
    category: "Electronics",
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    rating: 4.4,
    reviews: 65,
    image: "/images/electronics/Hp USB Mechanical Keyboard.jpg"
  },

  // -------------------- GROCERIES --------------------
  {
    id: 11,
    name: "Basmati Rice 10kg",
    category: "Groceries",
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    rating: 4.1,
    reviews: 193,
    image: "/images/groceries/Basmati Rice 10kg.jpg"
  },
  {
    id: 12,
    name: "Sunflower Oil 1L",
    category: "Groceries",
    price: 169,
    originalPrice: 210,
    discountPercent: 20,
    rating: 4.0,
    reviews: 211,
    image: "/images/groceries/Sunflower Oil 1L.jpg"
  },
  {
    id: 13,
    name: "Daily Milk Pocket (Pack of 2)",
    category: "Groceries",
    price: 118,
    originalPrice: 150,
    discountPercent: 21,
    rating: 4.3,
    reviews: 132,
    image: "/images/groceries/Daily Milk Pocket (Pack of 2).jpg"
  },
  {
    id: 14,
    name: "Crystal Sugar 5kg",
    category: "Groceries",
    price: 259,
    originalPrice: 349,
    discountPercent: 26,
    rating: 4.1,
    reviews: 89,
    image: "/images/groceries/Crystal Sugar 5kg.jpg"
  },
  {
    id: 15,
    name: "Tata Organic Green Tea 250g",
    category: "Groceries",
    price: 249,
    originalPrice: 329,
    discountPercent: 24,
    rating: 4.5,
    reviews: 141,
    image: "/images/groceries/Tata Organic Green Tea 250g.jpg"
  },

  // -------------------- FASHION --------------------
  {
    id: 16,
    name: "Puma Men Solid T-Shirt",
    category: "Fashion",
    price: 499,
    originalPrice: 899,
    discountPercent: 44,
    rating: 4.2,
    reviews: 301,
    image: "/images/fashion/Puma Men Solid T-Shirt.jpg"
  },
  {
    id: 17,
    name: "Women Kurti Set",
    category: "Fashion",
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    rating: 4.4,
    reviews: 179,
    image: "/images/fashion/Women Kurti Set.jpg"
  },
  {
    id: 18,
    name: "Adidas Running Shoes",
    category: "Fashion",
    price: 1699,
    originalPrice: 2499,
    discountPercent: 32,
    rating: 4.3,
    reviews: 147,
    image: "/images/fashion/Adidas Men Running Shoes.jpg"
  },
  {
    id: 19,
    name: "Gucci Classic Handbag",
    category: "Fashion",
    price: 1299,
    originalPrice: 1799,
    discountPercent: 28,
    rating: 4.2,
    reviews: 96,
    image: "/images/fashion/Gucci Classic Handbag.jpg"
  },
  {
    id: 20,
    name: "Men's Winter Jacket",
    category: "Fashion",
    price: 1999,
    originalPrice: 2999,
    discountPercent: 33,
    rating: 4.6,
    reviews: 188,
    image: "/images/fashion/Men's Winter Jacket.jpg"
  },

  // -------------------- HOME --------------------
  {
    id: 21,
    name: "Royal Home Soft Cotton Bedsheet",
    category: "Home",
    price: 1099,
    originalPrice: 1599,
    discountPercent: 31,
    rating: 4.3,
    reviews: 112,
    image: "/images/home/Royal Home Soft Cotton Bedsheet.jpg"
  },
  {
    id: 22,
    name: "Prestige Non-Stick Pan",
    category: "Home",
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    rating: 4.2,
    reviews: 88,
    image: "/images/home/Prestige Kitchen Non-stick Pan.jpg"
  },
  {
    id: 23,
    name: "Luxury Floor Carpet Large",
    category: "Home",
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    rating: 4.4,
    reviews: 132,
    image: "/images/home/Luxury Floor Carpet Larg.jpg"
  },

  // -------------------- BEAUTY --------------------
  {
    id: 24,
    name: "Lakme Matte Lipstick",
    category: "Beauty",
    price: 299,
    originalPrice: 499,
    discountPercent: 40,
    rating: 4.3,
    reviews: 89,
    image: "/images/beauty/lipstick.jpg"
  },
  {
    id: 25,
    name: "Nivea Soft Skin Cream",
    category: "Beauty",
    price: 149,
    originalPrice: 199,
    discountPercent: 25,
    rating: 4.4,
    reviews: 102,
    image: "/images/beauty/nivea.jpg"
  },

  // -------------------- TOYS --------------------
  {
    id: 26,
    name: "Shumee Kids Learning Toy Set",
    category: "Toys",
    price: 899,
    originalPrice: 1299,
    discountPercent: 31,
    rating: 4.4,
    reviews: 99,
    image: "/images/toys/Shumee Kids Learning Toy Set.jpg"
  },
  {
    id: 27,
    name: "Remote Control Racing Car",
    category: "Toys",
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    rating: 4.5,
    reviews: 188,
    image: "/images/toys/rccar.jpg"
  },
  {
    id: 28,
    name: "Soft Teddy Bear 3ft",
    category: "Toys",
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    rating: 4.6,
    reviews: 77,
    image: "/images/toys/teddy3ft.jpg"
  },

  // -------------------- EXTRA ELECTRONICS --------------------
  {
    id: 29,
    name: "Sony Noise Cancelling Headphones",
    category: "Electronics",
    price: 5999,
    originalPrice: 7999,
    discountPercent: 25,
    rating: 4.7,
    reviews: 201,
    image: "/images/electronics/sonyheadphones.jpg"
  },
  {
    id: 30,
    name: "Lenovo Tablet M10",
    category: "Electronics",
    price: 10999,
    originalPrice: 14999,
    discountPercent: 27,
    rating: 4.5,
    reviews: 150,
    image: "/images/electronics/lenovotab.jpg"
  }
];

export default products;
