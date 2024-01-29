const express = require("express");
const {
  getOrders,
  getOrdersByEmail,
  postOrdersByEmail,
} = require("../services/ordersServices");

const router = express.Router();

const handleRouteError = (res, error, routeName) => {
  console.error(`Error handling ${routeName} route:`, error);
  res.status(500).json({ error: "Internal Server Error" });
};

router.get("/", async (req, res) => {
  try {
    const database = req.app.locals.db;
    const { page, size } = req.query;
    const result = await getOrders(database, page, size);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    handleRouteError(res, error, "orders");
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const database = req.app.locals.db;
    const result = await getOrdersByEmail(database, email);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    handleRouteError(res, error, "Error fetching orders");
  }
});

router.patch("/orders/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const newData = req.body;
    const database = req.app.locals.db;

    const result = await postOrdersByEmail(database, newData, email);

    if (result.success) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(500).json({ error: "Update failed" });
    }
  } catch (error) {
    handleRouteError(res, error, "Error updating orders");
  }
});

module.exports = router;
