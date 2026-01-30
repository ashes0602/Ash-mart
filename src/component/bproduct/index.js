"use client";

import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../component/cart"; // Adjust path to match your CartContext location

export default function Buyer() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get addToCart from CartContext
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log("Buyer component mounted - fetching products...");

    fetch("/api/pdregister")
      .then(async (res) => {
        console.log("API Response status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("Products API error:", text);
          setProducts([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Products fetched:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Network error:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // Use the addToCart function from CartContext which handles the API call
      await addToCart(product);

      // Show success notification (the alert is already shown in CartContext, but we can add visual feedback)
      const notification = document.createElement("div");
      notification.className =
        "fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
      notification.textContent = `${product.pname} added to cart!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="text-green-900 text-xl mt-4 font-semibold">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-24">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="fixed top-1/2 right-1/4 w-48 h-48 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
            Discover Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Fresh, quality items delivered to your door
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-xl font-semibold mb-2">
              No products available yet
            </p>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex justify-center mb-8 gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p, index) => (
                <div
                  key={p.id || index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="h-48 w-full bg-gray-100">
                    <div className="bg-red-200 h-full w-full flex items-center justify-center">
                      Network issue
                    </div>
                    <img
                      src={p.image}
                      alt="network issue"
                      className="w-full h-48 object-cover block"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                    />

                    {/* Stock Badge */}
                    {p.availability > 0 ? (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h2 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1 group-hover:text-green-700 transition-colors">
                        {p.pname}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {p.brand}
                      </p>
                    </div>

                    <p className="text-3xl font-bold text-green-600 mb-3">
                      Rs {p.price?.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                        {p.category}
                      </span>
                      <span className="text-gray-600">
                        Qty: {p.availability}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                      {p.description}
                    </p>

                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={p.availability <= 0}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        p.availability > 0
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {p.availability > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
