// 1. if token exist
// 2. if not send res
// 3. decode the token
// 4. if valid next
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'You are not logged in',
        error: error.message,
      });
    }
    const decode = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: 'invalid token',
      error: error.message,
    });
  }
};
