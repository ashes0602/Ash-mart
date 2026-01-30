"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/cart?userId=${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setCart(data);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/order?userId=${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return alert("Login required");

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1,
          price: product.price,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCart((prev) => {
          const existingIndex = prev.findIndex(
            (i) => i.productId === product.id
          );
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = data.cart;
            return updated;
          } else {
            return [...prev, data.cart];
          }
        });
        alert("Added to cart!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const checkout = async (products) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("Please login first");
      return;
    }

    if (!products || products.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          products: products,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        
        // Clear cart after successful order
        for (const item of products) {
          await fetch("/api/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              productId: item.productId,
            }),
          });
        }
        
        setCart([]);
        setOrders((prev) => [data.order, ...prev]);
        return true;
      } else {
        alert("Failed to place order: " + data.message);
        return false;
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, orders, addToCart, removeFromCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}