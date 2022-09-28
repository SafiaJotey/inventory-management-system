const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createAProduct);
router
  .route('/bulk-update-with-same-data')
  .patch(productController.bulkUpdateProductWithSameValue);
router
  .route('/bulk-update-with-diff-data')
  .patch(productController.bulkUpdateProductWithDiffValue);
router.route('/:id').patch(productController.updateAProduct);

module.exports = router;
