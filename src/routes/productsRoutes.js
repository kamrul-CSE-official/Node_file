//routes/productsRoutes.js
const express = require("express");
const productsServices = require("../services/productsServices");

const router = express.Router();

const handleRouteError = (res, error, routeName) => {
  console.error(`Error handling ${routeName} route:`, error);
  res.status(500).json({ error: "Internal Server Error" });
};

router.get("/", async (req, res) => {
  console.log("all products");
  try {
    const { page, size } = req.query;
    const database = req.app.locals.db;
    const result = await productsServices.getProducts(database, page, size);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    handleRouteError(res, error, "products");
  }
});

router.get("/top", async (req, res) => {
  console.log("Top");

  try {
    const { page, size } = req.query;
    const database = req.app.locals.db;
    const result = await productsServices.getTopProducts(database, page, size);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    handleRouteError(res, error, "top products");
  }
});

module.exports = router;
