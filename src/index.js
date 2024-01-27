const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database Connection
const uri = `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.nohszvq.mongodb.net`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Authentication Middleware
const { verify, authRoutes } = require("./middlewares/authMiddleware");
app.use("/", authRoutes);

// MongoDB Connection and Server Startup
(async () => {
  try {
    await client.connect();
    const productsCluster = client.db("foodBaba").collection("products");
    const ordersCluster = client.db("foodBaba").collection("orders");

    // Routes
    app.get("/", (req, res) => {
      res.send("Food Baba server is running.....");
    });

    // Authentication Routes
    // const authRoutes = require("./middlewares/authMiddleware");
    // app.use("/", authRoutes);

    // Product Routes
    const productRoutes = require("./routes/productsRoutes")(productsCluster);
    app.use("/products", verify, productRoutes);

    // Order Routes
    const orderRoutes = require("./routes/ordersRoutes")(ordersCluster, verify);
    app.use("/orders", verify, orderRoutes);

    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
