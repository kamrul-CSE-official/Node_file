const express = require("express");
const productsRoutes = require("./productsRoutes");

const router = express.Router();

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

router.use("/products", productsRoutes);

module.exports = router;
