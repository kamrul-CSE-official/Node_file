const express = require("express");
const productsRoutes = require("./productsRoutes");
const ordersRoutes = require("./ordersRoutes");

const router = express.Router();

// Middleware usage
router.use("/products", productsRoutes);
router.use("/orders",ordersRoutes)

// test route
router.get("/", async (req, res) => {
  try {
    res.status(200).send({
      success: "success",
      message: "Node MVC Baba server is running.....",
    });
  } catch (error) {
    console.error("Error in route handling:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
