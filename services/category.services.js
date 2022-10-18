const Category = require('../models/Category');
module.exports.createCategoryServices = async (data) => {
  const result = await Category.create(data);
  return result;
};
module.exports.getAllCategories = async () => {
  const result = await Category.find({});
  return result;
};
module.exports.getcategorydeatails = async (id) => {
  const result = await Category.find({ _id: id });
  return result;
};
