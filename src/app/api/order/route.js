import Order from "../../../../lib/model/order";
import dbConnect from "../../../../lib/dbconnection";
import { NextResponse } from "next/server";

// CREATE NEW ORDER
export async function POST(req) {
  try {
    await dbConnect();

    const { userId, products } = await req.json();

    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { message: "userId and products are required" },
        { status: 400 }
      );
    }

    // Calculate total
    const total = products.reduce(
      (sum, p) => sum + p.price * (p.quantity || 1),
      0
    );

    const newOrder = new Order({
      userId,
      products,
      total,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST /api/order Error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

// GET ORDERS FOR A USER
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/order Error:", err);
    return NextResponse.json(
      { message: "Error fetching orders", error: err.message },
      { status: 500 }
    );
  }
}

// UPDATE ORDER (e.g., cancel, update status)
export async function PUT(req) {
  try {
    await dbConnect();

    const { orderId, updates } = await req.json();
    // updates = { status: "shipped" } or { products: [...], total: 100 }

    if (!orderId || !updates) {
      return NextResponse.json(
        { message: "orderId and updates are required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // Apply updates
    Object.assign(order, updates);

    // If products changed, recalc total
    if (updates.products) {
      order.total = updates.products.reduce(
        (sum, p) => sum + p.price * (p.quantity || 1),
        0
      );
    }

    await order.save();

    return NextResponse.json(
      { message: "Order updated successfully", order },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ PUT /api/order Error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
