"use client";

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Summer Sale is Here!",
      subtitle: "Up to 70% off on selected items",
      bg: "from-green-400 to-emerald-500"
    },
    {
      title: "New Arrivals Daily",
      subtitle: "Discover the latest trends in fashion",
      bg: "from-emerald-400 to-teal-500"
    },
    {
      title: "Free Shipping",
      subtitle: "On orders over Rs. 2000",
      bg: "from-teal-400 to-green-500"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { 
      name: "Electronics", 
      desc: "Best gadgets at unbeatable prices",
      icon: "💻",
      color: "from-blue-400 to-blue-600"
    },
    { 
      name: "Fashion", 
      desc: "Latest trends for men & women",
      icon: "👔",
      color: "from-pink-400 to-pink-600"
    },
    { 
      name: "Home & Kitchen", 
      desc: "Everything you need for your home",
      icon: "🏠",
      color: "from-orange-400 to-orange-600"
    },
    { 
      name: "Groceries", 
      desc: "Fresh and organic products delivered fast",
      icon: "🛒",
      color: "from-green-400 to-green-600"
    }
  ];

  const features = [
    { icon: "🚚", title: "Fast Delivery", desc: "Quick shipping to your doorstep" },
    { icon: "💳", title: "Secure Payment", desc: "Your transactions are safe" },
    { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
    { icon: "💬", title: "24/7 Support", desc: "We're here to help anytime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section with Slider */}
      <header className="relative overflow-hidden bg-white shadow-lg">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        {/* Slider */}
        <div className="relative h-[500px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-10`}></div>
              <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
                <h1 className={`text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent transform transition-all duration-1000 ${
                  currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  {slide.title}
                </h1>
                <p className={`text-2xl md:text-3xl text-gray-600 mb-10 transition-all duration-1000 delay-200 ${
                  currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  {slide.subtitle}
                </p>
                <div className={`flex gap-4 transition-all duration-1000 delay-400 ${
                  currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <a
                    href="/login"
                    className="bg-white text-green-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-green-900"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-green-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-500 hover:scale-110 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600">Explore our wide range of products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{category.desc}</p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Shop Now 
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Special Offer Just for You!</h2>
          <p className="text-xl mb-8 opacity-90">Sign up today and get 20% off your first purchase</p>
          <a
            href="/register"
            className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Claim Your Discount
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              E-Store
            </h3>
            <p className="text-gray-400">Your trusted online shopping destination</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                <span className="text-xl">in</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2026 E-Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}