const express = require("express");
const databaseConnection = require("../model/databaseConnection");
const router = express.Router();
const database = databaseConnection();

router.get("/", async (req, res) => {
  try {
    const { page, size } = req.query;

    const query = (await database).products.find();

    if (page && size) {
      query.skip(parseInt(page) * parseInt(size)).limit(parseInt(size));
    }

    const result = await query.toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error("Error handling products route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
