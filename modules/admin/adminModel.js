import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const admin = mongoose.model("admin", adminSchema);
export default admin;
