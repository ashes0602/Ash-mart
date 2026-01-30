"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../component/cart";
import Nav from "../../component/header";
import Footer from "../../component/footer";

export default function Orders() {
  const { orders } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [orders]);

  if (loading) {
    return (
      <div className="bg-green-100 min-h-screen">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <p className="text-center">Loading orders...</p>
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
          
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl text-green-900 font-bold mb-6">
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">No orders placed yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <div key={order._id || i} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg text-green-900">Order #{i + 1}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {product.name} × {product.quantity}
                      </span>
                      <span className="text-gray-900 font-medium">
                        Rs {product.price * product.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-green-900">Total:</span>
                  <span className="font-bold text-xl text-green-900">
                    Rs {order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}