import express from "express";

import agents from "./agentModel.js";

const router = express.Router();

export const getAgents = async (req, res) => {
  try {
    const agentList = await agents.find();

    res.status(200).json(agentList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postAgents = async (req, res) => {
  const { name, role, image, email, number } = req.body;

  const newAgent = new agents({
    name,
    role,
    image,
    email,
    number,
  });

  try {
    await newAgent.save();

    res.status(201).json(newAgent);
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};

export default router;
