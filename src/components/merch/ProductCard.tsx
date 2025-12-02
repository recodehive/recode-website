import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "../../pages/merch";
import ProductImageViewer from "./ProductImageViewer";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart(product);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const openViewer = (e: React.MouseEvent) => {
    e.preventDefault();
    setViewerOpen(true);
  };

  return (
    <>
      <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="product-card-image-wrapper">
        <div className="product-card-image" onClick={openViewer} style={{ cursor: 'pointer' }}>
          <img src={product.image} alt={product.title} loading="lazy" />
          {isHovered && (
            <motion.div
              className="product-card-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                className="overlay-button" 
                aria-label="Quick view"
                onClick={openViewer}
              >
                <Eye size={20} />
              </button>
            </motion.div>
          )}
        </div>
        <button
          className={`product-card-like ${isLiked ? "liked" : ""}`}
          onClick={toggleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
        {product.category && (
          <span className="product-card-badge">{product.category}</span>
        )}
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">{product.description}</p>

        {product.variants && (
          <div className="product-card-variants">
            {product.variants.size && (
              <div className="variant-group">
                <span className="variant-label">Sizes:</span>
                <div className="variant-options">
                  {product.variants.size.slice(0, 3).map((size) => (
                    <span key={size} className="variant-option">
                      {size}
                    </span>
                  ))}
                  {product.variants.size.length > 3 && (
                    <span className="variant-option">
                      +{product.variants.size.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="price-currency">$</span>
            <span className="price-amount">{product.price.toFixed(2)}</span>
          </div>
          <button
            className="product-card-button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>

    <ProductImageViewer
      isOpen={viewerOpen}
      onClose={() => setViewerOpen(false)}
      imageUrl={product.image}
      title={product.title}
    />
    </>
  );
};

export default ProductCard;
