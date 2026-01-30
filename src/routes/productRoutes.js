const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId/similar', productController.getSimilar);

module.exports = router;