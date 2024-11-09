import db from '../database/conexion.js';
class ClienteController{
  constructor(){

  }
  consultar(req,res){
    try{
      db.query(
        `SELECT * FROM cotizaciones.cliente`,
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: error.sqlMessage });
          }
          res.status(200).json(rows);
        }
      );
    }catch(err){
      res.status(500).json({ error: err.message });
    };
  }
  consultaByID(req,res){
    try{
      const{id}=req.params;
      db.query(
        `SELECT * FROM cotizaciones.cliente WHERE id_cliente=?`,[id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          }
          res.status(200).json(rows);
        }
      );
    }catch(err){
      res.status(500).json({ error: err.message });
    };
  }
  modificar(req,res){
    const{id}=req.params;
    try {
      const { nombre, rfc, edad, sueldo, telefono, correo, password } = req.body;
  
      db.query(
        `UPDATE cotizaciones.cliente 
          SET nombre=?,rfc=?,edad=?,sueldo=?,fecha_modificacion=NOW(), telefono=?, correo=?,password=? WHERE id_cliente=?;`,
        [nombre, rfc, edad, sueldo, telefono, correo, password,id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: error.sqlMessage });
          }

          if(rows.affectedRows==1){
            res.status(200).json({message:"Informacion de cliente actualizada"});
          }

        }
      );
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  baja(req,res){
    try{
      const{id}=req.params;
      db.query(
        `DELETE FROM cotizaciones.cliente WHERE id_cliente=?`,[id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          }
          if(rows.affectedRows==1){
            res.status(200).json({message:"Cliente Eliminado"});
          }
        }
      );
    }catch(err){
      res.status(500).json({ error: err.message });
    };
  }
  alta(req, res) {
    try {
      const { nombre, rfc, edad, sueldo, fecha_baja, telefono, correo, password } = req.body;
  
      db.query(
        `INSERT INTO cotizaciones.cliente 
          (nombre, rfc, edad, sueldo, fecha_alta, fecha_baja, fecha_modificacion, telefono, correo, password) 
         VALUES (?, ?, ?, ?, NOW(), ?, NOW(), ?, ?, ?);`,
        [nombre, rfc, edad, sueldo, fecha_baja, telefono, correo, password],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: error.sqlMessage });
          }
          res.status(201).json({id:rows.insertId});
        }
      );
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
}

export default ClienteController;