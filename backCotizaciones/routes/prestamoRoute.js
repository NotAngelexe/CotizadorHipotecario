import express from 'express';
const router = express.Router();
import PrestamoController from '../controllers/prestamoController.js';

const prestamoController = new PrestamoController();

router.get('/', prestamoController.consultar.bind(prestamoController));
router.post('/', prestamoController.alta.bind(prestamoController));
router.route('/:id')
  .get(prestamoController.consultaByID.bind(prestamoController))
  .put(prestamoController.modificar.bind(prestamoController))
  .delete(prestamoController.baja.bind(prestamoController));

export default router;
