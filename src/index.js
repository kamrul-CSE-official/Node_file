//index.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
// import colors from "co"
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
    const db = await databaseConnection();
    app.locals.db = db;

    app.use(routes);

    app.listen(port, () => {
      console.log(`Server is running on port: ${port} 🏃`.yellow);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:".red, error);
  }
})();
