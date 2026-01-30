"use client";

import { useState, useEffect } from "react";
import Footer from "../../component/footer";
import Seller from "../../component/sproduct";
import Buyer from "../../component/bproduct";
import BNav from "../../component/header";
import SNav from "../../component/sheader";

export default function Products() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      console.log("Raw savedUser:", savedUser); // Debug log
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user:", parsedUser); // Debug log
        console.log("User role:", parsedUser?.role); // Debug log
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("Current user state:", user); // Debug log
  console.log("Loading state:", loading); // Debug log

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <BNav />
        <p className="text-black text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full bg-green-100">
        <BNav />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <p className="text-black text-xl mb-4">No user found. Please log in.</p>
            <a href="/login" className="text-green-600 underline">Go to Login</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const role = user?.role?.toLowerCase();
  console.log("Rendering for role:", role); // Debug log

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      
      
      <div className="min-h-[calc(100vh-200px)]">
        {role === "seller" ? (
          <>
          <SNav />
          <Seller />
          </>
        ) : role === "buyer" ? (
          <>
          <BNav />
          <Buyer />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-full">
            <p className="text-black text-xl">Invalid user role: {role}</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}