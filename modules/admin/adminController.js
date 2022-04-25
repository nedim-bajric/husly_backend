import jwt from "jsonwebtoken";
import admin from "./adminModel.js";
import bcrypt from "bcrypt";

export const postAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingAdmin = await admin.findOne({ email });

    if (existingAdmin) {
      return res.status(403).json({ message: "Admin already exist." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newAdmin = new admin({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    const addedAdmin = await newAdmin.save();

    const user = {
      id: addedAdmin.id,
      firstName,
      lastName,
      email,
    };

    const token = jwt.sign(user, process.env.TOKEN_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { id, firstName, lastName } = existingAdmin;
    const user = { id, firstName, lastName, email };

    const token = jwt.sign(user, process.env.TOKEN_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
