"use client";

import { useState } from "react";

export default function Seller() {
  const [pname, setPname] = useState("");
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async () => {
  if (!pname || !brand || !id || !category || !description || !price || !availability || !image) {
    setError("❌ Please fill all fields.");
    alert("please fill blocks");
    return;
  }

  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }
    
    const user = JSON.parse(savedUser);
    console.log("👤 User object:", user); // DEBUG
    
    const sellerId = user.id || user._id || user.email;
    console.log("🆔 sellerId:", sellerId); // DEBUG
    
    const productData = {
      pname, 
      id,
      sellerId: sellerId,
      brand, 
      category, 
      description, 
      price: Number(price), // Convert to number
      availability: Number(availability), // Convert to number
      image 
    };
    
    console.log("📦 Sending product data:", productData); // DEBUG
    
    const res = await fetch("/api/pdregister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    console.log("📡 Response status:", res.status); // DEBUG
    const data = await res.json();
    console.log("📡 Response data:", data); // DEBUG

    if (res.ok) {
      alert("Product Registration successful!");
      // Reset form
      setPname("");
      setId("");
      setBrand("");
      setCategory("");
      setDescription("");
      setPrice("");
      setAvailability("");
      setImage("");
      setError("");
    } else {
      alert(data.message || "Product Registration failed.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ Something went wrong!");
  }
};

  return (
    <div className="h-full pb-24 flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side - Product Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div className="relative">
            {/* Product/Inventory Illustration */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Clipboard/Form Background */}
                <rect x="100" y="60" width="200" height="280" fill="#ffffff" rx="8" stroke="#047857" strokeWidth="3"/>
                <rect x="100" y="60" width="200" height="40" fill="#059669" rx="8"/>
                
                {/* Clipboard Clip */}
                <rect x="170" y="50" width="60" height="20" fill="#047857" rx="4"/>
                <rect x="180" y="55" width="40" height="15" fill="#10b981" rx="3"/>
                
                {/* Product Box Icon */}
                <g transform="translate(140, 120)">
                  <rect x="0" y="20" width="60" height="50" fill="#34d399" stroke="#047857" strokeWidth="2" rx="3"/>
                  <path d="M 0 20 L 30 5 L 60 20" fill="#10b981" stroke="#047857" strokeWidth="2"/>
                  <line x1="30" y1="5" x2="30" y2="70" stroke="#047857" strokeWidth="2"/>
                  <line x1="0" y1="45" x2="60" y2="45" stroke="#047857" strokeWidth="1.5" strokeDasharray="3,3"/>
                </g>
                
                {/* Form Lines */}
                <line x1="120" y1="200" x2="280" y2="200" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="220" x2="250" y2="220" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="240" x2="280" y2="240" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="260" x2="230" y2="260" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="280" x2="280" y2="280" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="300" x2="260" y2="300" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Checkmarks */}
                <path d="M 110 202 L 113 206 L 118 198" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M 110 242 L 113 246 L 118 238" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M 110 282 L 113 286 L 118 278" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                
                {/* Price Tag */}
                <g transform="translate(240, 110)">
                  <path d="M 0 10 L 20 10 L 30 20 L 20 30 L 0 30 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
                  <circle cx="8" cy="20" r="3" fill="#f59e0b"/>
                  <text x="15" y="24" fontSize="12" fill="#78350f" fontWeight="bold">$</text>
                </g>
                
                {/* Inventory Boxes Stack */}
                <g transform="translate(50, 240)">
                  <rect x="0" y="20" width="35" height="30" fill="#10b981" stroke="#047857" strokeWidth="1.5" rx="2"/>
                  <rect x="0" y="0" width="35" height="18" fill="#34d399" stroke="#047857" strokeWidth="1.5" rx="2"/>
                  <line x1="10" y1="8" x2="25" y2="8" stroke="#047857" strokeWidth="1.5"/>
                </g>
                
                <g transform="translate(310, 250)">
                  <rect x="0" y="15" width="35" height="30" fill="#10b981" stroke="#047857" strokeWidth="1.5" rx="2"/>
                  <rect x="0" y="0" width="35" height="13" fill="#34d399" stroke="#047857" strokeWidth="1.5" rx="2"/>
                  <line x1="10" y1="6" x2="25" y2="6" stroke="#047857" strokeWidth="1.5"/>
                </g>
                
                {/* Barcode */}
                <g transform="translate(130, 310)">
                  <rect x="0" y="0" width="3" height="15" fill="#047857"/>
                  <rect x="5" y="0" width="2" height="15" fill="#047857"/>
                  <rect x="9" y="0" width="4" height="15" fill="#047857"/>
                  <rect x="15" y="0" width="2" height="15" fill="#047857"/>
                  <rect x="19" y="0" width="3" height="15" fill="#047857"/>
                  <rect x="24" y="0" width="2" height="15" fill="#047857"/>
                  <rect x="28" y="0" width="4" height="15" fill="#047857"/>
                </g>
              </svg>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Right Side - Product Registration Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                Add New Product
              </h1>
              <p className="text-gray-600 text-sm">Register your product to the inventory</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={pname}
                  onChange={(e) => setPname(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="Enter product name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="Unique product ID"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="Brand name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="Product category"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none resize-none"
                  placeholder="Product description and details"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rs)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Qty</label>
                  <input
                    type="number"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Register Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}