const productServices = require('../services/product.services');

exports.getAllProducts = async (req, res, next) => {
  try {
    //find a product by id
    const products = await productServices.getProductServices(req.query.limit);
    // const products = await Product.findById(undefined);
    //some queries
    // const products = await Product.find({ _id: '63305a5d2bcd2a78c7b14f0f' });

    //or operator
    // const products = await Product.find({
    //   $or: [{ _id: '63305a5d2bcd2a78c7b14f0' }, { name: 'Mango' }],
    // });

    //not equal
    // const products = await Product.find({
    //   status: { $ne: 'out-of-stock' },
    // });

    //greater then
    // const products = await Product.find({
    //   quantity: { $gt: 100 },
    // });

    //projection
    // const products = await Product.find({}, 'name -_id');
    // const products = await Product.find({}).select({ quantity: 1, _id: 0 });

    //sort limit
    // const products = await Product.find({}).limit(5).sort({ quantity: -1 });

    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Couldn't get data",
      error: error.message,
    });
  }
};

exports.createAProduct = async (req, res, next) => {
  try {
    //create
    // const result = await Product.create(req.body);
    //create => do something => save

    const result = await productServices.createProductService(req.body);
    result.logger();
    res.status(200).send({
      success: true,
      message: 'data inserted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "data didn't insert",
      error: error.message,
    });
  }
};
exports.updateAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const upadatedProduct = await productServices.updateProductService(
      id,
      req.body
    );
    res.status(200).send({
      success: true,
      message: `product with id: ${id} successfully updated`,
      data: upadatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't update the product",
      error: error.message,
    });
  }
};
