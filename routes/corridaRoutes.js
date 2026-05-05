const express = require('express');
const router = express.Router();
const CorridaController = require('../controllers/CorridaController');

router.post('/', CorridaController.criar);
router.get('/', CorridaController.listar);
router.get('/:id', CorridaController.buscarPorId);
router.put('/:id', CorridaController.atualizar);
router.delete('/:id', CorridaController.deletar);

module.exports = router;
