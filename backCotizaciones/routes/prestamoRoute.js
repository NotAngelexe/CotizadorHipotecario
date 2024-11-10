import express from 'express';
const router = express.Router();
import PrestamoController from '../controllers/prestamoController.js';

const prestamoController = new PrestamoController();

//ruta para consultar los prestamos
router.get('/', prestamoController.consultar.bind(prestamoController));
//ruta para dar de alta un prestamo (actualmente no se usa)
router.post('/', prestamoController.alta.bind(prestamoController));
//ruta para consultar los prestamos de un cliente por su id
router.get('/cliente/:id', prestamoController.consultaByIdCliente.bind(prestamoController));
//ruta para calcular el prestamos solicitado, realiza el alta del prestamo
router.post('/calcular', prestamoController.solicitarPrestamo);
//ruta para obtener los tipos de prestamo
router.get('/tipo', prestamoController.getTipoPrestamo);
//rutas que usan un id - consultar,modificar, y dar de baja
router.route('/:id')
  .get(prestamoController.consultaByID.bind(prestamoController))
  .put(prestamoController.modificar.bind(prestamoController))
  .delete(prestamoController.baja.bind(prestamoController));
router.get('/:id/tipo', prestamoController.getTipoPrestamoById);

export default router;
