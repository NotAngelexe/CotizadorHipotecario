import express from 'express';
import cors from 'cors'
import administradorRoute from './routes/administradoresRoute.js';
import clientesRoute from './routes/clientesRoute.js';
import prestamoRoute from './routes/prestamoRoute.js';
import bancoRoute from './routes/bancosRoute.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo');
});
app.use(express.json());
app.use(cors());
app.use("/administrador", administradorRoute);
app.use("/cliente", clientesRoute);
app.use("/prestamo", prestamoRoute);
app.use("/banco", bancoRoute);



app.listen(3000, () => {
  console.log('Servidor activo');
});

