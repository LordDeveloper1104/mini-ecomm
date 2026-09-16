import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/Product.model.js";

dotenv.config();
connectDB();

const products = [
  // Electronics
  {
    name: "Wireless Noise Cancelling Headphones",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Over-ear headphones with active noise cancellation and 30hr battery life.",
    stock: 15,
  },
  {
    name: "Mechanical Keyboard",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
    description: "TKL mechanical keyboard with RGB backlight and blue switches.",
    stock: 10,
  },
  {
    name: "27 inch Monitor",
    price: 18999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    description: "IPS panel, 144Hz refresh rate, perfect for work and gaming.",
    stock: 8,
  },
  {
    name: "Wireless Mouse",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    description: "Ergonomic wireless mouse with 12 month battery life and silent clicks.",
    stock: 22,
  },
  {
    name: "USB C Hub 7 in 1",
    price: 2199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=500",
    description: "7 port hub with HDMI, USB 3.0, SD card reader and PD charging.",
    stock: 18,
  },

  // Footwear
  {
    name: "Running Shoes",
    price: 1499,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Lightweight running shoes with cushioned sole, great for daily runs.",
    stock: 30,
  },
  {
    name: "Leather Casual Sneakers",
    price: 2299,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
    description: "Clean minimal leather sneakers, goes well with both casuals and formals.",
    stock: 20,
  },
  {
    name: "Hiking Boots",
    price: 3799,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1520219306100-ec4afac9b501?w=500",
    description: "Waterproof ankle support boots built for rough terrain and long treks.",
    stock: 12,
  },
  {
    name: "Slip On Loafers",
    price: 1799,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500",
    description: "Comfortable suede loafers for everyday wear, easy slip on design.",
    stock: 25,
  },

  // Clothing
  {
    name: "Cotton Oversized T-Shirt",
    price: 499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "100% cotton oversized fit, available in multiple colors.",
    stock: 50,
  },
  {
    name: "Slim Fit Chinos",
    price: 1299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    description: "Stretch cotton slim fit chinos, wrinkle resistant and office ready.",
    stock: 35,
  },
  {
    name: "Hooded Sweatshirt",
    price: 999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500",
    description: "Fleece lined hoodie with kangaroo pocket, great for winters.",
    stock: 40,
  },
  {
    name: "Denim Jacket",
    price: 2499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500",
    description: "Classic washed denim jacket with button front and chest pockets.",
    stock: 18,
  },

  // Accessories
  {
    name: "Stainless Steel Water Bottle",
    price: 799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    description: "1 litre insulated bottle, keeps drinks cold for 24hrs.",
    stock: 40,
  },
  {
    name: "Backpack 30L",
    price: 1799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Water resistant backpack with laptop compartment and multiple pockets.",
    stock: 25,
  },
  {
    name: "Leather Wallet",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    description: "Slim genuine leather bifold wallet with 6 card slots.",
    stock: 45,
  },
  {
    name: "Analog Wrist Watch",
    price: 4999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Minimalist dial with stainless steel strap, water resistant up to 30m.",
    stock: 10,
  },
  {
    name: "Sunglasses Polarized",
    price: 1599,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    description: "UV400 polarized lenses with lightweight metal frame.",
    stock: 30,
  },

  // Home
  {
    name: "Desk Lamp with USB Port",
    price: 1299,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    description: "LED desk lamp with adjustable brightness and built-in USB charging port.",
    stock: 20,
  },
  {
    name: "Ceramic Coffee Mug Set",
    price: 699,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    description: "Set of 2 handcrafted ceramic mugs, microwave and dishwasher safe.",
    stock: 50,
  },
  {
    name: "Wooden Bookshelf 3 Tier",
    price: 3999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500",
    description: "Solid wood 3 tier shelf, easy to assemble, holds up to 15kg per shelf.",
    stock: 8,
  },
  {
    name: "Scented Candle Set",
    price: 599,
    category: "Home",
    image: "https://images.unsplash.com/photo-1603905938218-a7f55c473bee?w=500",
    description: "Pack of 3 soy wax candles in lavender, vanilla and sandalwood.",
    stock: 60,
  },

  // Fitness
  {
    name: "Yoga Mat",
    price: 899,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    description: "Non-slip 6mm thick yoga mat with carry strap.",
    stock: 35,
  },
  {
    name: "Resistance Bands Set",
    price: 599,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500",
    description: "Set of 5 resistance bands with different tension levels, includes carry bag.",
    stock: 45,
  },
  {
    name: "Adjustable Dumbbell 10kg",
    price: 2799,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
    description: "Cast iron adjustable dumbbell with weight plates and locking collars.",
    stock: 15,
  },
  {
    name: "Jump Rope Speed",
    price: 449,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=500",
    description: "Ball bearing speed rope with foam grip handles, adjustable length.",
    stock: 55,
  },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();