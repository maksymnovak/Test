const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

app.post("/send-discount-email", (req, res) => {
  const { email, discountCode } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Або інший постачальник пошти
    auth: {
      user: "raidshadow637@gmail.com",
      pass: "12345Qwerty)",
    },
  });

  const mailOptions = {
    from: "raidshadow637@gmail.com",
    to: email,
    subject: "Your Discount Code",
    text: `Your personal discount code: ${discountCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send error:", error);
      res.status(500).send("Email send error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
