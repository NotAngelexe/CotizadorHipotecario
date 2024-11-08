import express from 'express';
const router = express.Router();
import ClienteController from '../controllers/clientesController.js';

const clienteController = new ClienteController();

router.get('/', clienteController.consultar);
router.put('/', clienteController.alta);
router.route("/:id")
  .get(clienteController.consultaByID)
  .delete(clienteController.baja)  
  .put(clienteController.modificar);   

export default router;
