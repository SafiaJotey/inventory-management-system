const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const { verifyToken } = require('../../midlewires/verifyToken');
router.route('/signup').post(userController.signup);
router.route('/login').post(userController.login);
router.route('/getme').get(verifyToken, userController.getMe);

module.exports = router;
