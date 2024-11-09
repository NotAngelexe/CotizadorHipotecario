import express from 'express';
const router = express.Router();
import ClienteController from '../controllers/clientesController.js';

const clienteController = new ClienteController();

router.get('/', clienteController.consultar.bind(clienteController));
router.put('/', clienteController.alta.bind(clienteController));
router.route('/:id')
  .get(clienteController.consultaByID.bind(clienteController))
  .delete(clienteController.baja.bind(clienteController))
  .put(clienteController.modificar.bind(clienteController));

// Ruta para autenticación (inicio de sesión de cliente)
router.post('/login', clienteController.autenticar.bind(clienteController));

export default router;
