// services/productsServices.js
const pageNation = (database, page, size) => {
  let query = database.products.find({});

  if (page && size) {
    query = query.skip(parseInt(page) * parseInt(size)).limit(parseInt(size));
  }

  return query;
};

const getProducts = async (database, page, size) => {
  const query = pageNation(database, page, size);
  return query.toArray();
};

const getTopProducts = async (database, page, size) => {
  const query = database.products.find().sort({ orders: -1 });

  if (page ?? size) {
    const paginatedQuery = pageNation(database, page, size).sort({
      orders: -1,
    });
    return paginatedQuery.toArray();
  }

  return query.toArray();
};

module.exports = {
  getProducts,
  getTopProducts,
};
