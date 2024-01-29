// services/productsServices.js

const { ObjectId } = require("mongodb");

const validateObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId format");
  }
};

const pageNation = (database, page, size) => {
  let query = database.products.find({});

  if (page && size) {
    query = query.skip(parseInt(page) * parseInt(size)).limit(parseInt(size));
  }

  return query;
};

const getProducts = async (database, page, size) => {
  try {
    const query = pageNation(database, page, size);
    const result = await query.toArray();
    return result;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
};

const getTopProducts = async (database, page, size) => {
  try {
    let query = database.products.find().sort({ orders: -1 });

    if (page || size) {
      query = pageNation(database, page, size).sort({ orders: -1 });
    }

    const result = await query.toArray();
    return result;
  } catch (error) {
    console.error("Error in getTopProducts:", error);
    throw error;
  }
};

const getTotalNumberOfProducts = async (database) => {
  try {
    const result = await database.products.estimatedDocumentCount();
    return result;
  } catch (error) {
    console.error("Error in getTotalNumberOfProducts:", error);
    throw error;
  }
};

const getProductsDetails = async (database, id) => {
  try {
    validateObjectId(id);
    const query = { _id: new ObjectId(id) };
    const result = await database.products.findOne(query);

    if (!result) {
      throw new Error("Product not found");
    }

    return result;
  } catch (error) {
    console.error("Error in getProductsDetails:", error);
    throw error;
  }
};

module.exports = {
  getProducts,
  getTopProducts,
  getTotalNumberOfProducts,
  getProductsDetails,
};
