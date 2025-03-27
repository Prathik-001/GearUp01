import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiX, FiGrid, FiList, FiMoon, FiSun } from "react-icons/fi";
import { debounce } from "lodash";

const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 199.99,
    category: "Wearables",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    title: "Ultra HD Camera",
    price: 599.99,
    category: "Photography",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  }
];

const categories = ["Electronics", "Wearables", "Photography", "Accessories"];

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [darkMode, setDarkMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategories.length === 0 ||
            selectedCategories.includes(product.category)) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          product.rating >= ratingFilter
      );
      setFilteredProducts(filtered);
    }, 300),
    [selectedCategories, priceRange, ratingFilter]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
            Product Catalog
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun className="text-white" /> : <FiMoon />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Panel */}
          <div
            className={`md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${
              isFilterOpen ? "block" : "hidden md:block"
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Filters
            </h2>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Price Range
              </h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Categories
              </h3>
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded text-blue-500"
                  />
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {category}
                  </span>
                </label>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Minimum Rating
              </h3>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">{ratingFilter} stars</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-end mb-4 space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
                aria-label="Grid view"
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
                aria-label="List view"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;