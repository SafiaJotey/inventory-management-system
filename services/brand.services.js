const Brand = require('../models/Brand');
module.exports.createbrandservice = async (data) => {
  const result = await Brand.create(data);
  console.log(result);
  return result;
};
module.exports.getbrandservices = async () => {
  const result = await Brand.find({});
  return result;
};

module.exports.getBranddeatails = async (id) => {
  const result = await Brand.find({ _id: id });
  return result;
};
