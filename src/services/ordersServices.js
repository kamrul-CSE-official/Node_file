const pageNation = (database, page, size) => {
  let query = database.orders.find({});
  if (page && size) {
    query = query.skip(parseInt(page) * parseInt(size)).limit(parseInt(size));
  }
  return query;
};

const getOrders = async (database, page, size) => {
  try {
    const query = pageNation(database, page, size);
    const result = await query.toArray();
    return result;
  } catch (error) {
    console.error("Error in getOrders:", error);
    throw error;
  }
};

const getTopOrders = async (database, page, size) => {
  try {
    let query = database.orders.find().sort({ totalPrice: -1 });

    if (page || size) {
      query = pageNation(database, page, size).sort({ totalPrice: -1 });
    }

    const result = await query.toArray();
    return result;
  } catch (error) {
    console.error("Error in getTopOrders:", error);
    throw error;
  }
};

const getOrdersByEmail = async (database, email) => {
  try {
    const query = database.orders.find({ email: email });
    const result = await query.toArray();
    return result;
  } catch (error) {
    console.error("Error in getOrdersByEmail:", error);
    throw error;
  }
};

const getTotalNumberOfOrders = async (database) => {
  try {
    const result = await database.orders.estimatedDocumentCount();
    return result;
  } catch (error) {
    console.error("Error in getTotalNumberOfOrders:", error);
    throw error;
  }
};

const postOrdersByEmail = async (database, newData, email) => {
  try {
    const result = await database.orders.updateOne(
      { email: email },
      { $push: { orders: newData } },
      { upsert: true }
    );

    if (result.result.nModified > 0 || result.result.upsertedCount > 0) {
      return {
        success: true,
        data: { message: "Order Successfully Accepted" },
      };
    } else {
      return {
        success: false,
        error: { message: "Order Not Accepted" },
      };
    }
  } catch (error) {
    console.error("Error in postOrdersByEmail:", error);
    throw error;
  }
};

module.exports = {
  getOrders,
  getTopOrders,
  getTotalNumberOfOrders,
  getOrdersByEmail,
  postOrdersByEmail,
};
