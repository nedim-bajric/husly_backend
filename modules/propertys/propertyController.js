import express from "express";
import propertys from "./propertyModel.js";

const router = express.Router();

export const getPropertys = async (req, res) => {
  try {
    const propList = await propertys.find();

    res.status(200).json(propList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postPropertys = async (req, res) => {
  const { category, price, splash_image, street, address, desc } = req.body;

  const newProperty = new propertys({
    category,
    price,
    splash_image,
    street,
    address,
    desc,
  });

  try {
    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};

export default router;
