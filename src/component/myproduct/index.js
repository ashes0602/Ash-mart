"use client";

import { useState, useEffect } from "react";

export default function MyProducts() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    pname: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    availability: "",
    image: "",
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!user?.id && !user?._id) return setLoading(false);

      try {
        const res = await fetch("/api/pdregister");
        if (res.ok) {
          const allProducts = await res.json();
          const myProducts = allProducts.filter(
            (p) => p.sellerId === user.id || p.sellerId === user._id
          );
          setProducts(myProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyProducts();
  }, [user]);

  // Delete product
  const deleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/pdregister/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-green-900 text-xl">Loading your products...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-gray-800 text-xl mb-4">
            Please log in to view your products
          </p>
          <a
            href="/login"
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-green-900">My Products</h1>
          <a
            href="/product"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
          >
            Add New Product
          </a>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Products Yet
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              You haven't added any products yet.
            </p>
            <a
              href="/product"
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Add Your First Product
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.pname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full ${
                      product.availability > 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.availability > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1">
                    {product.pname}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

                  <p className="text-3xl font-bold text-green-600 mb-3">
                    Rs {product.price?.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                    <span className="text-gray-600">
                      Stock: {product.availability}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setEditForm({
                          id: product.id,
                          pname: product.pname,
                          brand: product.brand,
                          category: product.category,
                          description: product.description,
                          price: product.price,
                          availability: product.availability,
                          image: product.image,
                        });
                      }}
                      className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl hover:bg-blue-600 font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-700">
                Edit Product
              </h2>

              {["pname", "brand", "category", "image"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field]: e.target.value })
                  }
                  className="w-full mb-3 p-3 border rounded-lg"
                />
              ))}

              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full mb-3 p-3 border rounded-lg"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="p-3 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Availability"
                  value={editForm.availability}
                  onChange={(e) =>
                    setEditForm({ ...editForm, availability: e.target.value })
                  }
                  className="p-3 border rounded-lg"
                />
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={async () => {
                    const res = await fetch("/api/pdregister", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editForm),
                    });

                    if (res.ok) {
                      const updated = await res.json();

                      setProducts((prev) =>
                        prev.map((p) =>
                          p.id === editForm.id ? updated.product : p
                        )
                      );

                      setEditingProduct(null);
                      alert("Product updated successfully");
                    } else {
                      alert("Update failed");
                    }
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-300 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
