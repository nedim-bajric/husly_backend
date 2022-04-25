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
  const newProperty = new propertys(req.body);

  try {
    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await propertys.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property doesn't exist. " });
    }

    try {
      await propertys.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Property deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProperty = async (req, res) => {
  console.log("first");
  try {
    const property = await propertys.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property doesn't exist." });
    }
    try {
      const updatedProperty = await propertys.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProperty);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default router;
