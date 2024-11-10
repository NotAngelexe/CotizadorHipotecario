import express from 'express';
const router = express.Router();
import AdministradorController from '../controllers/administradoresController.js';

const administradorController = new AdministradorController();
//ruta para consultar a los administradores
router.get('/', administradorController.consultar.bind(administradorController));
//ruta para dar de alta un administrador
router.post('/', administradorController.alta.bind(administradorController));

//rutas que utilizan id - consultar,modificar y dar de baja
router.route('/:id')
  .get(administradorController.consultaByID.bind(administradorController))
  .put(administradorController.modificar.bind(administradorController))
  .delete(administradorController.baja.bind(administradorController));

//ruta para comprobar sesion de administrador
router.post('/login', administradorController.autenticar.bind(administradorController));

export default router;
