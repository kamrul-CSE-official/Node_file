const express = require("express");
const productsRoutes = require("./productsRoutes");
// const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({
      success: "success",
      message: "Food Baba server is running.....",
    });
  } catch (error) {
    console.error("Error in route handling:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.use("/products", authenticateJWT, productsRoutes);
router.use("/products", productsRoutes);

module.exports = router;
