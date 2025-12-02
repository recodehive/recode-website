import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react";
import "./ProductImageViewer.css";

interface ProductImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset on open
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  }, [isOpen]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 5);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale(Math.max(scale - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "+":
      case "=":
        handleZoomIn();
        break;
      case "-":
        handleZoomOut();
        break;
      case "r":
      case "R":
        handleRotate();
        break;
      case "0":
        handleReset();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, scale, rotation]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="image-viewer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="image-viewer-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="image-viewer-header">
            <h3 className="image-viewer-title">{title}</h3>
            <button
              className="image-viewer-close"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image Container */}
          <div
            className="image-viewer-content"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default" }}
          >
            <motion.div
              ref={imageRef}
              className="image-viewer-image-wrapper"
              animate={{
                scale,
                x: position.x,
                y: position.y,
                rotate: rotation,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.5,
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                draggable={false}
                className="image-viewer-image"
              />
            </motion.div>
          </div>

          {/* Controls */}
          <div className="image-viewer-controls">
            <button
              className="control-button"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              aria-label="Zoom out"
              title="Zoom Out (-)"
            >
              <ZoomOut size={20} />
            </button>
            <span className="zoom-indicator">{Math.round(scale * 100)}%</span>
            <button
              className="control-button"
              onClick={handleZoomIn}
              disabled={scale >= 5}
              aria-label="Zoom in"
              title="Zoom In (+)"
            >
              <ZoomIn size={20} />
            </button>
            <div className="control-divider" />
            <button
              className="control-button"
              onClick={handleRotate}
              aria-label="Rotate"
              title="Rotate (R)"
            >
              <RotateCw size={20} />
            </button>
            <button
              className="control-button"
              onClick={handleReset}
              aria-label="Reset view"
              title="Reset (0)"
            >
              <Maximize2 size={20} />
            </button>
          </div>

          {/* Instructions */}
          <div className="image-viewer-instructions">
            <span>🖱️ Scroll to zoom</span>
            <span>🤚 Drag to pan</span>
            <span>⌨️ R to rotate</span>
            <span>⌨️ ESC to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductImageViewer;
