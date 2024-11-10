import express from 'express';
const router = express.Router();
import ClienteController from '../controllers/clientesController.js';

const clienteController = new ClienteController();

//ruta para consultar clientes
router.get('/', clienteController.consultar.bind(clienteController));
//ruta para dar de alta un cliente
router.put('/', clienteController.alta.bind(clienteController));
//rutas que usan id - consultar, dar de baja y modificar un cliente
router.route('/:id')
  .get(clienteController.consultaByID.bind(clienteController))
  .delete(clienteController.baja.bind(clienteController))
  .put(clienteController.modificar.bind(clienteController));

//ruta para login cliente
router.post('/login', clienteController.autenticar.bind(clienteController));

export default router;
