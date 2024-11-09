import db from '../database/conexion.js';
class ClienteController{
  constructor(){

  }
  consultar(req,res){
    res.json({ msg: 'Clientes' });
  }
  consultaByID(req,res){
  }
  modificar(req,res){
  }
  baja(req,res){
  }
  alta(req, res) {
    try {
      const { nombre, rfc, edad, sueldo, fecha_baja, telefono, correo, password } = req.body;
  
      db.query(
        `INSERT INTO cotizaciones.cliente 
          (nombre, rfc, edad, sueldo, fecha_alta, fecha_baja, fecha_modificacion, telefono, correo, password) 
         VALUES (?, ?, ?, ?, NOW(), ?, NOW(), ?, ?, ?);`,
        [nombre, rfc, edad, sueldo, fecha_baja, telefono, correo, password],
        (error, results) => {
          if (error) {
            console.error("SQL Error: ", error.sqlMessage);
            res.status(500).json({ error: error.sqlMessage });
          } else {
            console.log("Record inserted successfully");
            res.status(201).json({ message: "Record inserted successfully", results });
          }
        }
      );
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
}

export default ClienteController;