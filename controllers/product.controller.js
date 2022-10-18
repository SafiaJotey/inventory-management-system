const { updateMany } = require('../models/Product');
const productServices = require('../services/product.services');

exports.getAllProducts = async (req, res, next) => {
  try {
    //filters for finding with
    let filters = { ...req.query };
    const queries = {};
    const excludeFields = ['sort', 'limit', 'page'];
    excludeFields.forEach((field) => delete filters[field]);
    //sort,
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(queries);
    }

    //pagination

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    //projection select
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
      console.log(queries);
    }
    //operators
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte|eq|neq)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);
    console.log(filters, queries);
    //get products
    const products = await productServices.getProductServices(filters, queries);
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
    // result.logger();
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

//Bulk Update Products With Same Values
exports.bulkUpdateProductWithSameValue = async (req, res, next) => {
  const { ids, data } = req.body;
  try {
    const result = await productServices.updateBulkProductsWithSameVaues(
      ids,
      data
    );
    res.status(200).send({
      succes: true,
      message: 'Bulk update is successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      succes: false,
      message: 'Bulk update is failed',
      error: error.message,
    });
  }
};

exports.bulkUpdateProductWithDiffValue = async (req, res, next) => {
  try {
    const result = await productServices.updateBulkProductsWithDiffVaues(
      req.body
    );
    res.status(200).send({
      success: true,
      message: 'Bulk update with different data is successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Bulk update with different data is failed',
      error: error.message,
    });
  }
};

exports.deleteWithID = async (req, res, next) => {
  try {
    const { id } = req.params;
    result = await productServices.deleteProductService(id);
    res.status(200).send({
      success: true,
      message: 'Successfully deleted the product',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Couldn't delete the data",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await productServices.deleteBulkProductService(req.body.ids);
    res.status(200).send({
      success: true,
      message: 'Successfully deleted the bulk products',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Couldn't delete the data",
      error: error.message,
    });
  }
};
