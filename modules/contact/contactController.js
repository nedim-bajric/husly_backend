import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const router = express.Router();

export const sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const output = `
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "Husly",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
};

export default router;
