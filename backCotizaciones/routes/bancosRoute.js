import express from 'express';
const router = express.Router();
import BancoController from '../controllers/bancosController.js';

const bancoController = new BancoController();

// Rutas para bancos
router.get('/', (req, res) => bancoController.consultar(req, res));
router.post('/', (req, res) => bancoController.alta(req, res));
router.route('/:id')
  .get((req, res) => bancoController.consultaByID(req, res))
  .put((req, res) => bancoController.modificar(req, res));
router.get('/:id/plazos', bancoController.getPlazosByBanco);
export default router;
