// authMiddleware.js
const express = require("express");
const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ status: "Unauthorized Access", code: "401" });
  }
  jwt.verify(token, process.env.TOKEN, (error, decode) => {
    if (error) {
      return res
        .status(401)
        .send({ status: "Unauthorized Access", code: "401" });
    }
    req.decode = decode;
    next();
  });
};

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

module.exports = { verify, authRoutes };
