import React from "react";
import { Filter, SlidersHorizontal, LayoutGrid, Shirt, Scissors, Package } from "lucide-react";
import "./FilterBar.css";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const categories = [
  { id: "all", label: "All Products", icon: <LayoutGrid size={18} /> },
  { id: "t-shirts", label: "T-Shirts", icon: <Shirt size={18} /> },
  { id: "hoodies", label: "Hoodies", icon: <Scissors size={18} /> }, // Using Scissors as a proxy for apparel/tailoring, or we can use Shirt
  { id: "accessories", label: "Accessories", icon: <Package size={18} /> },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        {/* Category Filters */}
        <div className="filter-section">
          <div className="filter-header">
            <Filter size={18} />
            <span className="filter-title">Categories</span>
          </div>
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-button ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="sort-section">
          <div className="filter-header">
            <SlidersHorizontal size={18} />
            <span className="filter-title">Sort By</span>
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
