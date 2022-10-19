const express = require('express');
const router = express.Router();
const storeController = require('../../controllers/storeController');
router
  .route('/')
  .post(storeController.creatStore)
  .get(storeController.getStore);

router.route('/:id').get(storeController.getStoreDetails);
module.exports = router;
