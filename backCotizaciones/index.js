import express from 'express';
import cors from 'cors'
import administradorRoute from './routes/administradoresRoute.js';
import clientesRoute from './routes/clientesRoute.js';
import prestamoRoute from './routes/prestamoRoute.js';
import bancoRoute from './routes/bancosRoute.js';

const app = express();

app.use(express.json());
app.use(cors());
//rutas utilizadas

//ruta para hacer referencia a administradores
app.use("/administrador", administradorRoute);
//ruta para hacer referencia a clientes
app.use("/cliente", clientesRoute);
//ruta para hacer referencia a prestamo
app.use("/prestamo", prestamoRoute);
//ruta para hacer referencia a bancos
app.use("/banco", bancoRoute);



app.listen(3000, () => {
  console.log('Servidor activo');
});

