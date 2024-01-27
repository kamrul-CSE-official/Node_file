// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();

authRoutes.post("/jwt", async (req, res) => {
  try {
    const body = req.body;
    const token = jwt.sign(body, process.env.TOKEN, { expiresIn: "10h" });
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        expires: expirationDate,
      })
      .send({ message: "Succeed", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRoutes.post("/logout", (req, res) => {
  const user = req.body;
  console.log(user);
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});

module.exports = authRoutes;
