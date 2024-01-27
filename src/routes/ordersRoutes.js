const express = require("express");

const orderRoutes = express.Router();

orderRoutes.get("/", async (req, res) => {
  try {
    const query = req.ordersCluster.find({});
    const result = await query.toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error("Error handling orders route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

orderRoutes.get("/:email", async (req, res) => {
  try {
    if (req.decode.email !== req.params.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const email = req.params.email;
    const query = req.ordersCluster.find({ email: email });
    const result = await query.toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error("Error handling orders route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

orderRoutes.patch("/:email", async (req, res) => {
  try {
    if (req.decode.email !== req.params.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const email = req.params.email;
    const newData = req.body;

    const result = await req.ordersCluster.updateOne(
      { email: email },
      { $push: { orders: newData } },
      { upsert: true }
    );

    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(500).json({ error: "Update failed" });
    }
  } catch (error) {
    console.error("Error handling orders route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = orderRoutes;
