// model/databaseConnection.js

const { ServerApiVersion, MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function databaseConnection(
  uri = `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.nohszvq.mongodb.net/?retryWrites=true&w=majority`
) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to the database 🎁".blue);

    const db = client.db("foodBaba");

    // collections
    const productsCollection = db.collection("products");
    const usersCollection = db.collection("users");
    const ordersCollection = db.collection("orders");

    return {
      products: productsCollection,
      users: usersCollection,
      orders: ordersCollection,
    };
  } catch (error) {
    console.error("Error connecting to the database:".red, error);
    throw error;
  }
}

module.exports = () => {
  return databaseConnection();
};
