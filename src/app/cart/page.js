"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../component/cart";
import Nav from "../../component/header";
import Footer from "../../component/footer";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, removeFromCart, checkout } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch("/api/pdregister");
        if (res.ok) {
          const allProducts = await res.json();
          const productMap = {};
          allProducts.forEach(p => {
            productMap[p.id] = p;
          });
          setProducts(productMap);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  const remove = async (item) => {
    if (!user?.id) return;

    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: item.productId,
        }),
      });

      if (res.ok) {
        removeFromCart(item.productId);
        alert("Item removed from cart");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Prepare products for order with name
    const productsForOrder = cart.map(item => {
      const product = products[item.productId];
      return {
        productId: item.productId,
        name: product?.pname || "Unknown Product",
        price: item.price,
        quantity: item.quantity,
      };
    });

    const success = await checkout(productsForOrder);
    if (success) {
      router.push("/order");
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="bg-green-100 min-h-screen">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <p className="text-center text-green-900">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
   <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen pb-24">
       {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>

            <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          
      <Nav />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl text-green-900 font-bold mb-6">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => {
                const product = products[item.productId];
                const itemTotal = (item.price || 0) * (item.quantity || 1);

                return (
                  <div
                    key={item._id}
                    className="bg-white shadow p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {product?.image && (
                        <img
                          src={product.image}
                          alt={product.pname}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900 text-lg">
                          {product?.pname || "Product"}
                        </h3>
                        {product?.brand && (
                          <p className="text-sm text-gray-600">{product.brand}</p>
                        )}
                        <p className="text-green-700 font-medium mt-1">
                          Rs {item.price} × {item.quantity} = Rs {itemTotal}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(item)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-green-900">Total:</span>
                <span className="text-2xl font-bold text-green-900">
                  Rs {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium text-lg"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}