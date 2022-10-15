const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
router
  .route('/')
  .post(brandController.createBrand)
  .get(brandController.getAllBrands);
module.exports = router;
