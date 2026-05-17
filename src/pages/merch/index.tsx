import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import { motion, type Variants } from "framer-motion";
import ProductGrid from "../../components/merch/ProductGrid";
import FilterBar from "../../components/merch/FilterBar";
import ShoppingCart from "../../components/merch/ShoppingCart";
import { ShoppingBag, Truck, RefreshCw, Leaf, ShieldCheck, Globe, Medal } from "lucide-react";
import { getProducts, isShopifyConfigured } from "../../lib/shopify";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function MerchPage(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(sampleProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    Array<Product & { quantity: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Shopify on mount
  useEffect(() => {
    async function fetchShopifyProducts() {
      try {
        if (isShopifyConfigured()) {
          console.log("Fetching products from Shopify...");
          const shopifyProducts = await getProducts(20);

          if (shopifyProducts && shopifyProducts.length > 0) {
            // Convert Shopify products to our Product interface
            const formattedProducts: Product[] = shopifyProducts.map((p) => {
              const imageUrl = p.images.edges[0]?.node.url || "";
              const price = parseFloat(p.priceRange.minVariantPrice.amount);

              return {
                id: p.id,
                title: p.title,
                description: p.description || "",
                price: price,
                image: imageUrl,
                category: "accessories", // Default category, you can use Shopify tags
                shopifyId: p.id,
                variants: {
                  size: p.variants.edges
                    .map((v) => v.node.title)
                    .filter((t) => t !== "Default Title"),
                },
              };
            });

            console.log(
              "Loaded products from Shopify:",
              formattedProducts.length,
            );
            setProducts(formattedProducts);
            setFilteredProducts(formattedProducts);
          } else {
            console.log("No products found in Shopify, using sample products");
            setProducts(sampleProducts);
            setFilteredProducts(sampleProducts);
          }
        } else {
          console.log("Shopify not configured, using sample products");
          setProducts(sampleProducts);
          setFilteredProducts(sampleProducts);
        }
      } catch (error) {
        console.error("Error fetching products from Shopify:", error);
        // Fallback to sample products on error
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchShopifyProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

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
  }, [selectedCategory, sortBy, products]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
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
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
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
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="hero-left" variants={itemVariants}>
              <h1 className="merch-hero-title">
                Official Recode Merch
              </h1>
              <p className="merch-hero-description">
                Wear your code pride! Premium quality apparel and accessories for
                developers who love open source.
              </p>
              <div className="hero-buttons">
                <button
                  className="hero-button hero-button-primary"
                  onClick={() => {
                    const section = document.querySelector(".merch-products-section");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Collection
                </button>
                <button
                  className="hero-button hero-button-secondary"
                  onClick={() => setSelectedCategory("accessories")}
                >
                  View Accessories
                </button>
              </div>
            </motion.div>
            <motion.div className="hero-right" variants={itemVariants}>
              <div className="merch-hero-stats">
                <motion.div className="stat-item stat-item-highlighted" whileHover={{ scale: 1.05 }} variants={itemVariants}>
                  <Medal className="stat-icon" size={28} color="var(--ifm-color-primary)" />
                  <span className="stat-label">Quality</span>
                </motion.div>
                <motion.div className="stat-item stat-item-highlighted" whileHover={{ scale: 1.05 }} variants={itemVariants}>
                  <Globe className="stat-icon" size={28} color="var(--ifm-color-primary)" />
                  <span className="stat-label">Worldwide Shipping</span>
                </motion.div>
                <motion.div className="stat-item stat-item-highlighted" whileHover={{ scale: 1.05 }} variants={itemVariants}>
                  <Leaf className="stat-icon" size={28} color="var(--ifm-color-primary)" />
                  <span className="stat-label">Eco-Friendly</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Main Content Area with Sidebar */}
        <div className="merch-main-content">
          {/* Sidebar with Filters */}
          <aside className="merch-sidebar">
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Products Grid */}
          <section className="merch-products-section">
            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--ifm-color-primary)",
                  }}
                >
                  Loading products...
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
            )}
          </section>
        </div>

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
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>

        {/* Info Section */}
        <section className="merch-info-section">
          <motion.div
            className="info-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="info-card info-card-highlighted" variants={itemVariants}>
              <div className="info-card-icon"><Truck size={32} color="var(--ifm-color-primary)" /></div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </motion.div>
            <motion.div className="info-card info-card-highlighted" variants={itemVariants}>
              <div className="info-card-icon"><RefreshCw size={32} color="var(--ifm-color-primary)" /></div>
              <h3>Easy Returns</h3>
              <p>30-day return policy, no questions asked</p>
            </motion.div>
            <motion.div className="info-card info-card-highlighted" variants={itemVariants}>
              <div className="info-card-icon"><Leaf size={32} color="var(--ifm-color-primary)" /></div>
              <h3>Sustainable</h3>
              <p>Eco-friendly materials and ethical production</p>
            </motion.div>
            <motion.div className="info-card info-card-highlighted" variants={itemVariants}>
              <div className="info-card-icon"><ShieldCheck size={32} color="var(--ifm-color-primary)" /></div>
              <h3>Quality Guarantee</h3>
              <p>Premium materials, built to last</p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
