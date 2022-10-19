const Store = require('../models/Store');
module.exports.createStoreService = async (data) => {
  const store = await Store.create(data);
  return store;
};
module.exports.getAllStores = async () => {
  const result = await Store.find({});
  return result;
};
module.exports.getStoredeatails = async (id) => {
  const result = await Store.find({ _id: id });
  return result;
};
