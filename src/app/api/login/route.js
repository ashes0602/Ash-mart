import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbconnection.js";
import User from "../../../../lib/model/user.js";
export async function POST(req) {
    try {
        await dbConnect(); 
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );}
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 400 }
            );}    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 400 }
            ); }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" } );
        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,  // ✅ ADDED THIS LINE
                }, },
            { status: 200 } );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        ); }}