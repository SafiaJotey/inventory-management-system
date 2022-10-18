const brandService = require('../services/brand.services');
module.exports.createBrand = async (req, res, next) => {
  try {
    const brand = await brandService.createbrandservice(req.body);

    res.status(200).send({
      success: true,
      message: 'successfully create a brand',

      data: brand,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Couldn't create a brand",
      error: error.message,
    });
  }
};
module.exports.getBrands = async (req, res, next) => {
  try {
    const brands = await brandService.getbrandservices();
    res.status(200).send({
      success: true,
      message: 'successfully get all brands',
      data: brands,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get the brands",
      error: error.message,
    });
  }
};
