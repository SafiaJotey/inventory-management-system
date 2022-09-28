const Product = require('../models/Product');
module.exports.getProductServices = async (limit) => {
  const product = await Product.find({}).limit(+limit);
  //   console.log(product);
  return product;
};

module.exports.createProductService = async (data) => {
  const product = new Product(data);
  const result = await product.save();
  return result;
};
