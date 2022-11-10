const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const { authorization } = require('../../midlewires/authorization');
const uploader = require('../../midlewires/uploader');
const { verifyToken } = require('../../midlewires/verifyToken');
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
  .post(verifyToken, authorization('admin'), productController.createAProduct);

router
  .route('/:id')
  .patch(productController.updateAProduct)
  .delete(verifyToken, authorization('admin'), productController.deleteWithID);

module.exports = router;
