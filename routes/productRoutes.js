const express = require('express');
const router = express.Router();
const productController = require('../controllers/productRoutes');

// Get products (with pagination)
router.get('/', productController.getAllProducts);

// Create product
router.post('/', productController.createProduct);

// Update product
router.put('/update', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;