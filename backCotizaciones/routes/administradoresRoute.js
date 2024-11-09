import express from 'express';
const router = express.Router();
import AdministradorController from '../controllers/administradoresController.js';

const administradorController = new AdministradorController();

router.get('/', administradorController.consultar.bind(administradorController));
router.post('/', administradorController.alta.bind(administradorController));
router.route('/:id')
  .get(administradorController.consultaByID.bind(administradorController))
  .put(administradorController.modificar.bind(administradorController))
  .delete(administradorController.baja.bind(administradorController));

// Ruta para autenticación (inicio de sesión)
router.post('/login', administradorController.autenticar.bind(administradorController));

export default router;
