import mongoose from "mongoose";

const agentSchema = mongoose.Schema({
  name: { type: String },
  role: { type: String },
  image: { type: String },
  email: { type: String },
  number: { type: String },
});

const agents = mongoose.model("agents", agentSchema);
export default agents;
