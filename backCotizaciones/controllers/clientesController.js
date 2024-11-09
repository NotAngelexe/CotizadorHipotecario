import db from '../database/conexion.js';

class ClienteController {
  constructor() {}

  // Consultar todos los clientes
  consultar(req, res) {
    try {
      db.query(
        `SELECT * FROM cotizaciones.cliente`,
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else {
            res.status(200).json(rows);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Consultar un cliente por ID
  consultaByID(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `SELECT * FROM cotizaciones.cliente WHERE id_cliente = ?`, [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else {
            res.status(200).json(rows);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Crear un nuevo cliente
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
            res.status(400).json({ error: err.sqlMessage });
          } else {
            res.status(201).json({ id: rows.insertId });
          }
        }
      );
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Modificar un cliente existente
  modificar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, rfc, edad, sueldo, telefono, correo, password } = req.body;
  
      db.query(
        `UPDATE cotizaciones.cliente 
         SET nombre = ?, rfc = ?, edad = ?, sueldo = ?, fecha_modificacion = NOW(), 
         telefono = ?, correo = ?, password = ? 
         WHERE id_cliente = ?;`,
        [nombre, rfc, edad, sueldo, telefono, correo, password, id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Información de cliente actualizada" });
          } else {
            res.status(404).json({ message: "Cliente no encontrado" });
          }
        }
      );
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un cliente
  baja(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `DELETE FROM cotizaciones.cliente WHERE id_cliente = ?`, [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Cliente eliminado exitosamente" });
          } else {
            res.status(404).json({ message: "Cliente no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Autenticar cliente (inicio de sesión)
  autenticar(req, res) {
    try {
      const { correo, password } = req.body;
      db.query(
        `SELECT * FROM cotizaciones.cliente WHERE correo = ? AND password = ?`,
        [correo, password],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.length === 1) {
            res.status(200).json({ message: "Autenticación exitosa", cliente: rows[0] });
          } else {
            res.status(401).json({ message: "Correo o contraseña incorrectos" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ClienteController;
