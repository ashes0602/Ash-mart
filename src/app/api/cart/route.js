import Cart from "../../../../lib/model/cart";
import dbConnect from "../../../../lib/dbconnection";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();
    const { userId, productId, quantity, price } = await req.json();

    console.log("📦 POST /api/cart received:", { userId, productId, quantity, price });

    if (!userId || !productId || !quantity || !price) {
      console.log("❌ Missing fields:", { userId, productId, quantity, price });
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const exists = await Cart.findOne({ userId, productId });

    if (exists) {
      exists.quantity += quantity;
      await exists.save();

      return NextResponse.json(
        { message: "Quantity updated", cart: exists },
        { status: 200 }
      );
    }

    const newCartItem = new Cart({
      userId,
      productId,
      quantity,
      price,
    });

    await newCartItem.save();

    return NextResponse.json(
      { message: "Product added to cart", cart: newCartItem },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("📦 GET /api/cart - userId:", userId);

    if (!userId) {
      console.log("❌ No userId provided");
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const cartItems = await Cart.find({ userId });
    console.log("✅ Found cart items:", cartItems.length);

    return NextResponse.json(cartItems, { status: 200 });
  } catch (err) {
    console.error("❌ GET Error:", err);
    return NextResponse.json(
      { message: "Error fetching cart", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId, productId } = body;

    console.log("📦 PUT /api/cart received:", body);
    console.log("🔍 Extracted - userId:", userId, "productId:", productId);

    if (!userId || !productId) {
      console.log("❌ Missing required fields - userId:", userId, "productId:", productId);
      return NextResponse.json(
        { message: "userId and productId required", received: { userId, productId } },
        { status: 400 }
      );
    }

    const item = await Cart.findOne({ userId, productId });
    console.log("🔍 Found item:", item);

    if (!item) {
      console.log("❌ Item not found in cart");
      return NextResponse.json(
        { message: "Item not found in cart" },
        { status: 404 }
      );
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();

      console.log("✅ Quantity decreased to:", item.quantity);
      return NextResponse.json(
        { message: "Quantity decreased", cart: item },
        { status: 200 }
      );
    }

    // quantity === 1 → remove item
    await Cart.deleteOne({ _id: item._id });

    console.log("✅ Item removed from cart");
    return NextResponse.json(
      { message: "Item removed from cart" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ PUT Error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
