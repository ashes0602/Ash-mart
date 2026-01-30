import Product from "../../../../lib/model/product";
import dbConnect from "../../../../lib/dbconnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    console.log("📥 Received data:", body); // DEBUG
    
    const { id, sellerId, brand, pname, category, description, price, availability, image } = body;

    // Check all required fields
    if (!id || !sellerId || !pname || !brand || !category || !description || !price || !availability || !image) {
      console.log("❌ Missing fields:", { id, sellerId, pname, brand, category, description, price, availability, image }); // DEBUG
      return NextResponse.json(
        { message: "All fields required", missing: { id: !id, sellerId: !sellerId, pname: !pname, brand: !brand, category: !category, description: !description, price: !price, availability: !availability, image: !image } },
        { status: 400 }
      );
    }
    
    // Check if product ID already exists
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return NextResponse.json({ message: "Product with this ID already exists" }, { status: 400 });
    }

    const newProduct = new Product({
      id,
      sellerId,
      pname,
      brand,
      category,
      description,
      price: Number(price),
      availability: Number(availability),
      image,
    });

    console.log("💾 Saving product:", newProduct); // DEBUG
    await newProduct.save();
    console.log("✅ Product saved successfully"); // DEBUG

    return NextResponse.json(
      { message: "Product registered successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Save error:", err);
    return NextResponse.json(
      { message: "Error saving product", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await Product.findOne({ id });
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    }
    
    const products = await Product.find({});
    console.log("📦 Fetched products:", products.length); // DEBUG
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("❌ GET Error:", err);
    return NextResponse.json(
      { message: "Error fetching products", error: err.message },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    await dbConnect();

    const {
      id,            // product id (required)
      pname,
      brand,
      category,
      description,
      price,
      availability,
      image,          
    } = await req.json();


    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

  
    const product = await Product.findOne({ id });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Update only provided fields
    if (pname !== undefined) product.pname = pname;
    if (brand !== undefined) product.brand = brand;
    if (category !== undefined) product.category = category;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (availability !== undefined) product.availability = availability;
    if (image !== undefined) product.image = image;

    await product.save();

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ UPDATE PRODUCT ERROR:", err);
    return NextResponse.json(
      {
        message: "Error updating product",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
