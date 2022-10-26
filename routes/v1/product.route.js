const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const uploader = require('../../midlewires/uploader');
// const multer=require('multer')
// const uploader = multer({
//   dest: 'images/'})
//   router
//   .route('/file-upload')
//   .post(uploader.single('image'), productController.fileUpload);

router
  .route('/file-upload')
  .post(uploader.array('image'), productController.fileUpload);
router
  .route('/bulk-update-with-same-data')
  .patch(productController.bulkUpdateProductWithSameValue);
router
  .route('/bulk-update-with-diff-data')
  .patch(productController.bulkUpdateProductWithDiffValue);
router.route('/bulk-delete').delete(productController.bulkDeleteProducts);
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createAProduct);

router
  .route('/:id')
  .patch(productController.updateAProduct)
  .delete(productController.deleteWithID);

module.exports = router;
