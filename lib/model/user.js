import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ type:String, required:true},
    role:{ type:String, enum: ["Buyer", "Seller", "buyer", "seller"], default: "buyer"},
    email:{ type:String, required:true},
    phone:{ type:String, required:true},
    address:{ type:String, required:true},
    password:{ type:String, required:true},
    cpassword:{ type:String, required:true},
});
const User= mongoose.models.User|| mongoose.model("User",userSchema);
export default User;