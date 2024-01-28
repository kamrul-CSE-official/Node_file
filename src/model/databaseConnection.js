const { ServerApiVersion, MongoClient } = require("mongodb");

async function databaseConnection(uri = "mongodb://127.0.0.1:27017/PC_Build") {
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

    const db = client.db("PC_Build");

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

module.exports = databaseConnection;
