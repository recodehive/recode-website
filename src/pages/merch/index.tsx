import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import ProductGrid from "../../components/merch/ProductGrid";
import FilterBar from "../../components/merch/FilterBar";
import ShoppingCart from "../../components/merch/ShoppingCart";
import { ShoppingBag } from "lucide-react";
import "./merch.css";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: {
    size?: string[];
    color?: string[];
  };
  shopifyId?: string;
}

// Sample products - Replace with actual Shopify data
const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Recode Hive Classic T-Shirt",
    description: "Premium cotton t-shirt with Recode Hive logo",
    price: 29.99,
    image: "/img/merch/tshirt.jpeg",
    category: "t-shirts",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "White", "Navy"],
    },
  },
  {
    id: "2",
    title: "Code & Coffee Hoodie",
    description: "Cozy hoodie perfect for coding sessions",
    price: 49.99,
    image: "/img/merch/hoodie.jpeg",
    category: "hoodies",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Navy", "Gray", "Black"],
    },
  },
  {
    id: "3",
    title: "Recode Laptop Sticker Pack",
    description: "Set of 5 waterproof vinyl stickers",
    price: 9.99,
    image: "/img/merch/sticker.jpeg",
    category: "accessories",
  },
  {
    id: "4",
    title: "Developer's Mug",
    description: "Ceramic mug with inspiring code quotes",
    price: 14.99,
    image: "/img/merch/mug.jpeg",
    category: "accessories",
  },
  {
    id: "5",
    title: "Recode Tote Bag",
    description: "Durable canvas tote for your laptop and books",
    price: 19.99,
    image: "/img/merch/bag.jpeg",
    category: "accessories",
  },
  {
    id: "6",
    title: "Recode Cap",
    description: "Adjustable snapback cap with embroidered logo",
    price: 24.99,
    image: "/img/merch/cap.jpeg",
    category: "accessories",
  },
];

export default function MerchPage(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Array<Product & { quantity: number }>>([]);

  useEffect(() => {
    let filtered = [...sampleProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout
      title="Official Merch Store"
      description="Get your official Recode Hive swag - t-shirts, hoodies, stickers and more!"
    >
      <div className="merch-page">
        {/* Hero Section */}
        <section className="merch-hero">
          <motion.div
            className="merch-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="merch-hero-title" style={{ color: '#1a1a1a' }}>
              <ShoppingBag className="inline-block mr-3" size={48} />
              Official Recode Merch
            </h1>
            <p className="merch-hero-description">
              Wear your code pride! Premium quality apparel and accessories for developers
              who love open source.
            </p>
            <div className="merch-hero-stats">
              <div className="stat-item">
                <span className="stat-number" style={{ color: '#1a1a1a' }}>100%</span>
                <span className="stat-label">Quality</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" style={{ color: '#1a1a1a' }}>🌍</span>
                <span className="stat-label">Worldwide Shipping</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" style={{ color: '#1a1a1a' }}>💚</span>
                <span className="stat-label">Eco-Friendly</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid */}
        <section className="merch-products-section">
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </section>

        {/* Shopping Cart */}
        <ShoppingCart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

        {/* Floating Cart Button */}
        <button
          className="floating-cart-button"
          onClick={() => setCartOpen(true)}
          aria-label="Open shopping cart"
        >
          <ShoppingBag size={24} />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>

        {/* Info Section */}
        <section className="merch-info-section">
          <div className="info-grid">
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>🚚 Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </motion.div>
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>🔄 Easy Returns</h3>
              <p>30-day return policy, no questions asked</p>
            </motion.div>
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3>🌱 Sustainable</h3>
              <p>Eco-friendly materials and ethical production</p>
            </motion.div>
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3>💯 Quality Guarantee</h3>
              <p>Premium materials, built to last</p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
