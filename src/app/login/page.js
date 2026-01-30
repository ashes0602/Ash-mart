"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        alert("Login successful!");
        window.location.href = "/product";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side - Illustration/Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div className="relative">
            {/* Store/Shopping Illustration */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Store Building */}
                <rect x="80" y="120" width="240" height="200" fill="#059669" rx="8"/>
                <rect x="80" y="120" width="240" height="40" fill="#047857" rx="8"/>
                
                {/* Awning */}
                <path d="M 60 120 L 80 140 L 320 140 L 340 120 Z" fill="#10b981"/>
                <path d="M 80 140 L 80 160 L 320 160 L 320 140 Z" fill="#34d399" opacity="0.6"/>
                
                {/* Windows */}
                <rect x="110" y="180" width="60" height="60" fill="#dcfce7" rx="4"/>
                <rect x="190" y="180" width="60" height="60" fill="#dcfce7" rx="4"/>
                <rect x="270" y="180" width="30" height="60" fill="#dcfce7" rx="4"/>
                
                {/* Door */}
                <rect x="140" y="260" width="50" height="60" fill="#065f46" rx="4"/>
                <circle cx="180" cy="290" r="3" fill="#fbbf24"/>
                
                {/* Sign */}
                <rect x="140" y="80" width="120" height="30" fill="#ffffff" rx="6"/>
                <text x="200" y="100" fontSize="18" fill="#047857" fontWeight="bold" textAnchor="middle">MART</text>
                
                {/* Shopping Cart */}
                <g transform="translate(260, 250)">
                  <rect x="0" y="10" width="35" height="30" fill="none" stroke="#047857" strokeWidth="2.5" rx="3"/>
                  <path d="M 0 10 L -5 0 L 5 0" fill="none" stroke="#047857" strokeWidth="2.5"/>
                  <circle cx="10" cy="45" r="4" fill="#047857"/>
                  <circle cx="25" cy="45" r="4" fill="#047857"/>
                  <line x1="8" y1="20" x2="27" y2="20" stroke="#34d399" strokeWidth="2"/>
                  <line x1="8" y1="27" x2="27" y2="27" stroke="#34d399" strokeWidth="2"/>
                </g>
                
                {/* Decorative Shopping Bags */}
                <g transform="translate(50, 280)">
                  <rect x="0" y="10" width="20" height="25" fill="#10b981" rx="2"/>
                  <path d="M 5 10 Q 10 5 15 10" fill="none" stroke="#047857" strokeWidth="1.5"/>
                </g>
                
                <g transform="translate(330, 270)">
                  <rect x="0" y="10" width="25" height="30" fill="#34d399" rx="2"/>
                  <path d="M 6 10 Q 12.5 4 19 10" fill="none" stroke="#047857" strokeWidth="1.5"/>
                </g>
              </svg>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}