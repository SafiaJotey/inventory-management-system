const userServices = require('../services/user.services');
const { generateToken } = require('../utils.js/token');
const User = require('../models/User');
exports.signup = async (req, res) => {
  try {
    const user = await userServices.createUserservices(req.body);
    res.status(200).send({
      success: true,
      message: 'successfully signed up',
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't create the user",
      error: error.message,
    });
  }
};
/*
1. check email and pass given
2. nload user wit email
3.if not user send res
4.compare pass
5.if pass not correct send res
6. check user active
7. not active send res
8. generate token
9. send user and token
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: fail,
        message: 'Please provide your credential',
      });
    }

    const user = await userServices.finduserByEmail(email);
    if (!user) {
      return res.status(401).send({
        success: fail,
        messege: 'No user found, Signup first',
      });
    }

    const isPasswordValid = user.matchPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).send({
        success: false,
        messege: 'wrong password',
      });
    }
    if (user.status !== 'active') {
      return res.status(403).send({
        success: false,
        messege: 'you account is not active',
      });
    }
    const { password: psw, ...others } = user.toObject();
    const token = generateToken(user);
    res.status(200).send({
      success: true,
      message: 'Successfully logges in',
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "couldn't get user",
      error: error.message,
    });
  }
};
