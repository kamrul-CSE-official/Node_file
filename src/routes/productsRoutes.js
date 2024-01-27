const express = require("express");
const { ObjectId } = require("mongodb");

const productRoutes = express.Router();

productRoutes.get("/", async (req, res) => {
  try {
    const { page, size } = req.query;

    if (page && size) {
      const query = req.productsCluster
        .find()
        .skip(parseInt(page) * parseInt(size))
        .limit(parseInt(size));

      const result = await query.toArray();

      res.status(200).json({ status: 200, data: result });
    } else {
      const query = req.productsCluster.find({});
      const result = await query.toArray();
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    console.error("Error handling products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRoutes.get("/top", async (req, res) => {
  try {
    const { page, size } = req.query;

    const query = req.productsCluster
      .find({})
      .sort({ orders: -1 })
      .skip(parseInt(page) * parseInt(size))
      .limit(parseInt(size) || 10);

    const result = await query.toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error("Error handling top products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRoutes.get("/total", async (req, res) => {
  try {
    const total = await req.productsCluster.estimatedDocumentCount();
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error handling total products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await req.productsCluster.findOne(query);
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error("Error handling products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRoutes.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expecting an array." });
    }

    const query = await req.productsCluster.insertMany(data);
    console.log(query);
    res.status(200).json({ status: 200, data: query });
  } catch (error) {
    console.error("Error handling products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = productRoutes;
