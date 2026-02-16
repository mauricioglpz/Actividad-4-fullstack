const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, tareasController.obtenerTareas);
router.post('/', authMiddleware, tareasController.crearTarea);
router.delete('/:id', authMiddleware, tareasController.eliminarTarea);

module.exports = router;
