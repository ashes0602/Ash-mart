import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbconnection";
import User from "../../../../lib/model/user";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, role, email, phone, address, password, cpassword } =
      await req.json();

    console.log({
      name,
      role,
      phone,
      address,
      email,
      password,
      cpassword,
    });

    if (
      !name ||
      !role ||
      !phone ||
      !address ||
      !email ||
      !password ||
      !cpassword
    ) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }
    const once = await User.findOne({ email });
    if (once) {
      return NextResponse.json(
        { message: "email is used before" },
        { status: 404 }
      );
    }
    console.log("incoming data:", {
      name,
      role,
      email,
      phone,
      address,
      password,
      cpassword,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = new User({
        name,
        role,
        phone,
        email,
        address,
        password: hashedPassword,
        cpassword: hashedPassword,
      });

      await newUser.save();
      console.log("✅ User saved:", newUser);

      return NextResponse.json({
        success: true,
        user: {
          name: newUser.name,
          role: newUser.type, // 👈 Seller or Buyer
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error("❌ Save error:", err);
      return NextResponse.json(
        { message: "Error saving user", error: err.message },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await dbConnect();
    const authHeader = req.header.GET("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 401 }
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ✅ Find user from token
    const user = await User.findById(decoded.id).select("-password -cpassword");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { message: "Error fetching user", error: err.message },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    await dbConnect();
    const { email, name, phone } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true }
    ).select("-password -cpassword");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error updating user", error: err.message },
      { status: 500 }
    );
  }
}
