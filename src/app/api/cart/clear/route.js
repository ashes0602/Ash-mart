import Cart from "../../../../../lib/model/cart";
import dbConnect from "../../../../../lib/dbconnection";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await dbConnect();
    await Cart.deleteMany({});
    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err.message }, { status: 500 });
  }
}