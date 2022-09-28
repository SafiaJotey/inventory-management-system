const Product = require('../models/Product');
module.exports.getProductServices = async (limit) => {
  //   const product = await Product.find({}).limit(+limit);
  const product = await Product.find({});
  //   console.log(product);
  return product;
};

module.exports.createProductService = async (data) => {
  const product = new Product(data);
  const result = await product.save();
  return result;
};
module.exports.updateProductService = async (productId, data) => {
  //   console.log(productId, data);
  //   const updatedProduct = await Product.updateOne(
  //     { _id: productId },
  //     { $set: data },
  //     { runValidators: true }
  //   );
  const product = await Product.findById(productId);
  const updatedProduct = await product.set(data).save();
  return updatedProduct;
};
