const categoryservices = require('../services/category.services');

module.exports.createCategory = async (req, res, next) => {
  try {
    const category = await categoryservices.createCategoryServices(req.body);
    res.status(200).send({
      success: true,
      messege: 'successfully created the category',
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't create category",
      error: error.messege,
    });
  }
};
module.exports.getCategory = async (req, res, next) => {
  try {
    const category = await categoryservices.getAllCategories();
    res.status(200).send({
      success: true,
      message: 'successfully get allthe category',
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get the category",
      error: error.message,
    });
  }
};
module.exports.getCategoryDetails = async (req, res, next) => {
  try {
    const categoryDetails = await categoryservices.getcategorydeatails(
      req.params.id
    );
    res.status(200).send({
      success: true,
      message: 'successfully get the Category Details ',
      data: categoryDetails,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get the Category Details",
      error: error.message,
    });
  }
};
