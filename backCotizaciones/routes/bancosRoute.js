import express from 'express';
const router = express.Router();
import BancoController from '../controllers/bancosController.js';

const bancoController = new BancoController();

//ruta para consutar bancos
router.get('/', (req, res) => bancoController.consultar(req, res));
//ruta para dar de alta un banco
router.post('/', (req, res) => bancoController.alta(req, res));
//rutas que utilizan id - consultar,modificar
router.route('/:id')
  .get((req, res) => bancoController.consultaByID(req, res))
  .put((req, res) => bancoController.modificar(req, res));
//ruta para obtener los plazos de un banco
router.get('/:id/plazos', bancoController.getPlazosByBanco);
export default router;
