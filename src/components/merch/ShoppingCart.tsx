import React from "react";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../pages/merch";
import "./ShoppingCart.css";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<Product & { quantity: number }>;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // TODO: Integrate with Shopify checkout
    alert(
      "Shopify checkout integration coming soon! This will redirect to Shopify's secure checkout.",
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-title">
                <ShoppingBag size={24} />
                <h2>Shopping Cart</h2>
                <span className="cart-count">({items.length})</span>
              </div>
              <button
                className="cart-close-button"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="cart-content">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={64} className="empty-icon" />
                  <h3>Your cart is empty</h3>
                  <p>Add some awesome Recode merch to get started!</p>
                  <button className="cart-continue-button" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="cart-items">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="cart-item-details">
                          <h4 className="cart-item-title">{item.title}</h4>
                          <p className="cart-item-price">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="cart-item-actions">
                            <div className="quantity-controls">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="quantity-display">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              className="cart-item-remove"
                              onClick={() => onRemoveItem(item.id)}
                              aria-label="Remove item"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="cart-footer">
                    {/* Shipping Notice */}
                    {subtotal < 50 && (
                      <div className="cart-notice">
                        <span>💡</span>
                        <p>
                          Add ${(50 - subtotal).toFixed(2)} more for free
                          shipping!
                        </p>
                      </div>
                    )}
                    {subtotal >= 50 && (
                      <div className="cart-notice success">
                        <span>✅</span>
                        <p>You qualify for free shipping!</p>
                      </div>
                    )}

                    {/* Totals */}
                    <div className="cart-totals">
                      <div className="cart-total-row">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="cart-total-row">
                        <span>Shipping:</span>
                        <span>
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="cart-total-row total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      className="cart-checkout-button"
                      onClick={handleCheckout}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={20} />
                    </button>

                    <p className="cart-secure-text">
                      🔒 Secure checkout powered by Shopify
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
