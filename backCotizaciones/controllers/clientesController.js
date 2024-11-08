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
  alta(req,res){
    try{
      db.query('INSERT INTO cotizacion.cliente () VALUES ();')
    }catch(err){
      res.status(500).send(error);
    }
  }
}

export default ClienteController;