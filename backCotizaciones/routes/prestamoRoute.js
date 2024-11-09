import express from 'express';
const router = express.Router();
import PrestamoController from '../controllers/prestamoController.js';

const prestamoController = new PrestamoController();

router.get('/', prestamoController.consultar.bind(prestamoController));
router.post('/', prestamoController.alta.bind(prestamoController));
router.get('/cliente/:id', prestamoController.consultaByIdCliente.bind(prestamoController));
router.post('/calcular', prestamoController.solicitarPrestamo);

router.get('/tipo', prestamoController.getTipoPrestamo);
router.route('/:id')
  .get(prestamoController.consultaByID.bind(prestamoController))
  .put(prestamoController.modificar.bind(prestamoController))
  .delete(prestamoController.baja.bind(prestamoController));
router.get('/:id/tipo', prestamoController.getTipoPrestamoById);

export default router;
