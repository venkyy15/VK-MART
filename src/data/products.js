const products = [
  //  MOBILES
  {
    id: 1,
    name: "iPhone 17 Pro Max 5G",
    category: "Mobiles",
    price: 18999,
    originalPrice: 25999,
    discountPercent: 27,
    rating: 4.3,
    reviews: 234,
    image: "/images/mobiles/Iphone 17 pro max 5G.jpg",
    images: [
      "/images/mobiles/Iphone17/1.jpg",
      "/images/mobiles/Iphone17/2.jpg",
      "/images/mobiles/Iphone17/3.jpg"
    ],
    description: "iPhone 17 Pro Max with A19 chip, ProMotion display and advanced camera system.",
    highlights: [
      "6.9 inch Super Retina XDR Display",
      "A19 Bionic Processor",
      "Triple 48MP Camera",
      "5000 mAh Battery",
      "5G Supported"
    ]
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
    image: "/images/mobiles/Samsung Galaxy S23 Ultra.jpg",
    images: [
      "/images/mobiles/S23/1.jpg",
      "/images/mobiles/S23/2.jpg",
      "/images/mobiles/S23/3.jpg"
    ],
    description: "Samsung Galaxy S23 Ultra with 200MP camera and Snapdragon 8 Gen 2.",
    highlights: [
      "200MP Quad Camera",
      "6.8 inch AMOLED Display",
      "45W Fast Charging",
      "S-Pen Included",
      "5G Supported"
    ]
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
    image: "/images/mobiles/Realme Narzo 60 Pro.jpg",
    images: [
      "/images/mobiles/Narzo60/1.jpg",
      "/images/mobiles/Narzo60/2.jpg",
      "/images/mobiles/Narzo60/3.jpg"
    ],
    description: "Realme Narzo series with curved OLED display.",
    highlights: [
      "Curved AMOLED Display",
      "5000 mAh Battery",
      "67W Fast Charge",
      "64MP Main Camera",
      "Premium Vegan Leather"
    ]
  },

  //  ELECTRONICS
  {
    id: 4,
    name: "VU Ultra HD TV 50",
    category: "Electronics",
    price: 32999,
    originalPrice: 42999,
    discountPercent: 23,
    rating: 4.5,
    reviews: 121,
    image: "/images/electronics/VU Ultra HD TV 50.jpg",
    images: [
      "/images/electronics/VUTV/1.jpg",
      "/images/electronics/VUTV/2.jpg"
    ],
    description: "50-inch Ultra HD 4K TV with Dolby Vision and Atmos.",
    highlights: [
      "50-inch 4K Ultra HD",
      "Dolby Atmos | Dolby Vision",
      "Ultra Bright Panel",
      "Chromecast Built-in",
      "3 HDMI Ports"
    ]
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
    image: "/images/electronics/airpods.jpg",
    images: [
      "/images/electronics/airpods/1.jpg",
      "/images/electronics/airpods/2.jpg"
    ],
    description: "HD sound earbuds with AI noise cancellation.",
    highlights: [
      "24 Hours Battery",
      "AI Noise Cancellation",
      "Touch Control",
      "Bluetooth 5.3",
      "Fast Charging"
    ]
  },

  {
    id: 6,
    name: "HP Smartchoice Victus Gaming Laptop",
    category: "Electronics",
    price: 58999,
    originalPrice: 69999,
    discountPercent: 16,
    rating: 4.4,
    reviews: 87,
    image: "/images/electronics/HP Nitro Gaming Laptop.jpg",
    images: [
      "/images/electronics/Nitro/1.jpg",
      "/images/electronics/Nitro/2.jpg",
      "/images/electronics/Nitro/3.jpg"
    ],
    description: "High-performance gaming laptop for pro gamers.",
    highlights: [
      "Ryzen 7 Processor",
      "RTX 3050 Graphics",
      "512GB SSD",
      "144Hz Display",
      "RGB Backlit Keyboard"
    ]
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
    image: "/images/electronics/Boat Bluetooth Speaker Mini.jpg",
    images: [
      "/images/electronics/BoatMini/1.jpg",
      "/images/electronics/BoatMini/2.jpg"
    ],
    description: "Pocket-size speaker with heavy bass.",
    highlights: [
      "10W Output",
      "Deep Bass",
      "12 Hours Battery",
      "Bluetooth 5.0",
      "Portable Design"
    ]
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
    image: "/images/electronics/Apple Smart Watch Active.jpg",
    images: [
      "/images/electronics/Watch/1.jpg",
      "/images/electronics/Watch/2.jpg"
    ],
    description: "Smart fitness watch with heart monitoring.",
    highlights: [
      "Heart Rate Monitor",
      "Sleep Tracking",
      "100+ Sports Modes",
      "SpO2 Sensor",
      "Water Resistant"
    ]
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
    image: "/images/electronics/Dell Laptop Cooling Stand.jpg",
    images: [
      "/images/electronics/Cooler/1.jpg",
      "/images/electronics/Cooler/2.jpg"
    ],
    description: "Cooling pad for laptops to reduce heating.",
    highlights: [
      "Dual Fans",
      "Silent Operation",
      "USB Powered",
      "Adjustable Height",
      "Metal Mesh"
    ]
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
    image: "/images/electronics/Hp USB Mechanical Keyboard.jpg",
    images: [
      "/images/electronics/Keyboard/1.jpg",
      "/images/electronics/Keyboard/2.jpg"
    ],
    description: "Mechanical keyboard for fast typing and gaming.",
    highlights: [
      "Blue Switch Keys",
      "LED Backlight",
      "USB Plug & Play",
      "Durable Build",
      "Anti-Ghosting Keys"
    ]
  },

  //  GROCERIES 

  {
    id: 11,
    name: "Basmati Rice 10kg",
    category: "Groceries",
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    rating: 4.1,
    reviews: 193,
    image: "/images/groceries/Basmati Rice 10kg.jpg",
    images: [
      "/images/groceries/Rice/1.jpg",
      "/images/groceries/Rice/2.jpg"
    ],
    description: "Premium long-grain basmati rice.",
    highlights: [
      "Premium Quality",
      "Long Grain",
      "Aged Rice",
      "Suitable for Biriyani",
      "10kg Pack"
    ]
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
    image: "/images/groceries/Sunflower Oil 1L.jpg",
    images: [
      "/images/groceries/Oil/1.jpg"
    ],
    description: "Healthy sunflower oil for daily cooking.",
    highlights: [
      "Low Absorption",
      "Vitamin E Rich",
      "Healthy for Heart",
      "Refined Oil",
      "1L Pack"
    ]
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
    image: "/images/groceries/Daily Milk Pocket (Pack of 2).jpg",
    images: [
      "/images/groceries/Milk/1.jpg"
    ],
    description: "Tasty and fresh milk packets.",
    highlights: [
      "Farm Fresh",
      "Rich Taste",
      "Pack of 2",
      "No Preservatives"
    ]
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
    image: "/images/groceries/Crystal Sugar 5kg.jpg",
    images: [
      "/images/groceries/Sugar/1.jpg"
    ],
    description: "Pure sugar crystals great for cooking.",
    highlights: [
      "Pure White Sugar",
      "Fast Dissolving",
      "5kg Bag"
    ]
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
    image: "/images/groceries/Tata Organic Green Tea 250g.jpg",
    images: [
      "/images/groceries/Tea/1.jpg"
    ],
    description: "Organic green tea for a healthy lifestyle.",
    highlights: [
      "Organic Certified",
      "Fresh Aroma",
      "250g Pack"
    ]
  },

  //  FASHION 

  {
    id: 16,
    name: "Puma Men Solid T-Shirt",
    category: "Fashion",
    price: 499,
    originalPrice: 899,
    discountPercent: 44,
    rating: 4.2,
    reviews: 301,
    image: "/images/fashion/Puma Men Solid T-Shirt.jpg",
    images: [
      "/images/fashion/Shirt/1.jpg"
    ],
    description: "Soft cotton Puma t-shirt.",
    highlights: [
      "100% Cotton",
      "Comfort Fit",
      "Breathable Fabric"
    ]
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
    image: "/images/fashion/Women Kurti Set.jpg",
    images: [
      "/images/fashion/Kurti/1.jpg"
    ],
    description: "Elegant kurti set for festive wear.",
    highlights: [
      "Cotton Blend",
      "Soft Fabric",
      "Designer Pattern"
    ]
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
    image: "/images/fashion/Adidas Men Running Shoes.jpg",
    images: [
      "/images/fashion/Shoes/1.jpg"
    ],
    description: "Comfortable sports running shoes.",
    highlights: [
      "Anti-slip Sole",
      "Breathable Mesh",
      "Lightweight Design"
    ]
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
    image: "/images/fashion/Gucci Classic Handbag.jpg",
    images: [
      "/images/fashion/Bag/1.jpg"
    ],
    description: "Premium women's handbag.",
    highlights: [
      "Leather Finish",
      "Premium Stitching",
      "Spacious Design"
    ]
  },

  {
    id: 20,
    name: "Mens Winter Jacket",
    category: "Fashion",
    price: 1999,
    originalPrice: 2999,
    discountPercent: 33,
    rating: 4.6,
    reviews: 188,
    image: "/images/fashion/Mens Winter Jacket.jpg",
    images: [
      "/images/fashion/Jacket/1.jpg"
    ],
    description: "Warm winter jacket for cold weather.",
    highlights: [
      "Fur Lining",
      "Wind Resistant",
      "Premium Zippers"
    ]
  },

  //  HOME 

  {
    id: 21,
    name: "Royal Home Soft Cotton Bedsheet",
    category: "Home",
    price: 1099,
    originalPrice: 1599,
    discountPercent: 31,
    rating: 4.3,
    reviews: 112,
    image: "/images/home/Royal Home Soft Cotton Bedsheet.jpg",
    images: [
      "/images/home/Bedsheet/1.jpg"
    ],
    description: "Soft and premium bedsheet.",
    highlights: [
      "Cotton Fabric",
      "Bright Colors",
      "King Size"
    ]
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
    image: "/images/home/Prestige Kitchen Non-stick Pan.jpg",
    images: [
      "/images/home/Pan/1.jpg"
    ],
    description: "Durable non-stick pan for cooking.",
    highlights: [
      "Non-Stick Coating",
      "Ergonomic Handle",
      "Gas & Induction Compatible"
    ]
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
    image: "/images/home/Luxury Floor Carpet Large.jpg",
    images: [
      "/images/home/Carpet/1.jpg"
    ],
    description: "Soft & large luxury carpet.",
    highlights: [
      "Soft Fabric",
      "Large Size",
      "Anti-Slip Backing"
    ]
  },

  //  BEAUTY 

  {
    id: 24,
    name: "Lakme Matte Lipstick",
    category: "Beauty",
    price: 299,
    originalPrice: 499,
    discountPercent: 40,
    rating: 4.3,
    reviews: 89,
    image: "/images/beauty/Lakme Matte Lipstick.jpg",
    images: [
      "/images/beauty/Lipstick/1.jpg"
    ],
    description: "Long-lasting matte finish lipstick.",
    highlights: [
      "12 Hour Stay",
      "Bold Color",
      "Smooth Matte"
    ]
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
    image: "/images/beauty/Nivea Soft Skin Cream.jpg",
    images: [
      "/images/beauty/Cream/1.jpg"
    ],
    description: "Moisturizing cream for soft skin.",
    highlights: [
      "Hydrating",
      "Lightweight",
      "Quick Absorption"
    ]
  },

  //  TOYS 

  {
    id: 26,
    name: "Shumee Kids Learning Toy Set",
    category: "Toys",
    price: 899,
    originalPrice: 1299,
    discountPercent: 31,
    rating: 4.4,
    reviews: 99,
    image: "/images/toys/Shumee Kids Learning Toy Set.jpg",
    images: [
      "/images/toys/ToySet/1.jpg"
    ],
    description: "Learning toy set for toddlers.",
    highlights: [
      "Safe for Kids",
      "Colorful Design",
      "Boosts Creativity"
    ]
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
    image: "/images/toys/Remote Control Racing Car.jpg",
    images: [
      "/images/toys/Car/1.jpg"
    ],
    description: "High speed RC racing car.",
    highlights: [
      "Fast Speed",
      "Durable Body",
      "Rechargeable Battery"
    ]
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
    image: "/images/toys/Soft Teddy Bear 3ft.jpg",
    images: [
      "/images/toys/Teddy/1.jpg"
    ],
    description: "Cute & soft teddy bear.",
    highlights: [
      "3 Feet Height",
      "Soft Plush",
      "Gift Material"
    ]
  },

  //  ELECTRONICS 

  {
    id: 29,
    name: "Sony Noise Cancelling Headphones",
    category: "Electronics",
    price: 5999,
    originalPrice: 7999,
    discountPercent: 25,
    rating: 4.7,
    reviews: 201,
    image: "/images/electronics/Sony Noise Cancelling Headphones.jpg",
    images: [
      "/images/electronics/Sony/1.jpg"
    ],
    description: "Premium ANC headphones by Sony.",
    highlights: [
      "Active Noise Cancellation",
      "30 Hours Battery",
      "Bluetooth 5.2"
    ]
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
    image: "/images/electronics/Lenovo Tablet M10.jpg",
    images: [
      "/images/electronics/Tablet/1.jpg"
    ],
    description: "10 inch tablet suitable for study & entertainment.",
    highlights: [
      "10-inch Screen",
      "4GB RAM",
      "7000 mAh Battery"
    ]
  }
];

export default products;
