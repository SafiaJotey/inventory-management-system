const User = require('../models/User');

exports.createUserservices = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.finduserByEmail = async (email) => {
  return await User.findOne({ email });
};
