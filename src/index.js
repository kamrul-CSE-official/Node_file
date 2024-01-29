const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line no-unused-vars
const colors = require("colors");
const cookieParser = require("cookie-parser");
const databaseConnection = require("./model/databaseConnection");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT || 5001;

dotenv.config();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    const db = await databaseConnection(
      `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.nohszvq.mongodb.net/?retryWrites=true&w=majority`
    );
    app.locals.db = db;

    app.use(routes);

    // Error handling middleware
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      res = "Invalid Response"; // This would overwrite the response object
      res.status(500).json({ error: "Internal Server Error" });
    });

    app.listen(port, () => {
      console.log(`Server is running on port: ${port} 🏃`.yellow);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:".red, error);
  }
})();
