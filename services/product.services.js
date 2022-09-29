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
  console.log(productId, data);
  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  //   const product = await Product.findById(productId);
  //   const updatedProduct = await product.set(data).save();
  return updatedProduct;
};
module.exports.updateBulkProductsWithSameVaues = async (ids, data) => {
  const updatedProducts = await Product.updateMany({ _id: ids }, data, {
    runValidators: true,
  });
  return updatedProducts;
};

module.exports.updateBulkProductsWithDiffVaues = async (data) => {
  const products = [];
  data.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    );
  });
  const updatedProduct = await Promise.all(products);
  return updatedProduct;
};

module.exports.deleteProductService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};
module.exports.deleteBulkProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
