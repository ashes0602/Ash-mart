import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function dbConnect() {
  // ❗ DO NOT throw at import time
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing");
    throw new Error("Database not configured");
  }

  // Prevent multiple connections
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "ashmart",
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connection error:", err);
    throw err;
  }
}
