// routes/productsRoutes.js
const express = require("express");
const productsServices = require("../services/productsServices");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleRouteError = (res, error, routeName) => {
  console.error(`Error handling ${routeName} route:`, error);

  // If it's a custom error, use its statusCode; otherwise, default to 500
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ error: error.message });
};

const catchError = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const router = express.Router();

router.get(
  "/",
  catchError(async (req, res) => {
    const { page, size } = req.query;
    const database = req.app.locals.db;
    const result = await productsServices.getProducts(database, page, size);
    res.status(200).json({ status: 200, data: result });
  })
);

router.get(
  "/top",
  catchError(async (req, res) => {
    const { page, size } = req.query;
    const database = req.app.locals.db;
    const result = await productsServices.getTopProducts(database, page, size);
    res.status(200).json({ status: 200, data: result });
  })
);

router.get(
  "/total",
  catchError(async (req, res) => {
    const database = req.app.locals.db;
    const total = await productsServices.getTotalNumberOfProducts(database);
    res.status(200).json({ total });
  })
);

router.get(
  "/:id",
  catchError(async (req, res) => {
    const database = req.app.locals.db;
    const id = req.params.id;
    const result = await productsServices.getProductsDetails(database, id);
    res.status(200).json({ status: 200, data: result });
  })
);

// Error handling middleware
router.use((error, req, res) => {
  if (error instanceof CustomError) {
    handleRouteError(res, error, "Custom Error");
  } else {
    console.error("Unexpected error:", error);
    handleRouteError(
      res,
      new CustomError("Internal Server Error", 500),
      "Internal Server Error"
    );
  }
});

module.exports = router;
