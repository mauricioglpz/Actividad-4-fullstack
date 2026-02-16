const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, productosController.obtenerProductos);
router.post('/', authMiddleware, productosController.crearProducto);
router.delete('/:id', authMiddleware, productosController.eliminarProducto);

module.exports = router;

