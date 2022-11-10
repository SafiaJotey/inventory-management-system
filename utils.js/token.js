const jwt = require('jsonwebtoken');
exports.generateToken = (userinfo) => {
  const payload = {
    email: userinfo.email,
    role: userinfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '7days',
  });
  return token;
};
