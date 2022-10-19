const storeServices = require('../services/store.services');
module.exports.creatStore = async (req, res, next) => {
  try {
    const store = await storeServices.createStoreService(req.body);
    res.status(200).send({
      success: true,
      message: 'Successfully create the store',
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't create the store",
      error: error.message,
    });
  }
};

module.exports.getStore = async (req, res, next) => {
  try {
    const store = await storeServices.getAllStores();
    res.status(200).send({
      success: true,
      message: 'successfully get allthe store',
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get the store",
      error: error.message,
    });
  }
};
module.exports.getStoreDetails = async (req, res, next) => {
  try {
    const storeDetails = await storeServices.getStoredeatails(req.params.id);
    res.status(200).send({
      success: true,
      message: 'successfully get the store Details ',
      data: storeDetails,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get the store Details",
      error: error.message,
    });
  }
};
