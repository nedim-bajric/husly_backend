import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import agentRoutes from "./modules/agents/agentRoutes.js";
import propertyRoutes from "./modules/propertys/propertyRoutes.js";
import contactRoutes from "./modules/contact/contactRoutes.js";
const app = express();

app.use(
  cors(),
  express.urlencoded({ extended: true }),
  express.json({ extended: true })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/agents", agentRoutes);
app.use("/propertys", propertyRoutes);
app.use("/email", contactRoutes);

dotenv.config();

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
mongoose
  .connect(URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
