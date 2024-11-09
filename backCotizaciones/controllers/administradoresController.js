import db from '../database/conexion.js';

class AdministradorController {
  constructor() {}

  // Consultar todos los administradores
  consultar(req, res) {
    try {
      db.query(
        `SELECT * FROM cotizaciones.administrador`,
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

  // Consultar un administrador por ID
  consultaByID(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `SELECT * FROM cotizaciones.administrador WHERE id_administrador = ?`, [id],
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

  // Crear un nuevo administrador
  alta(req, res) {
    try {
      const { nombre, password, correo } = req.body;
      db.query(
        `INSERT INTO cotizaciones.administrador (nombre, password, correo) VALUES (?, ?, ?);`,
        [nombre, password, correo],
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

  // Modificar un administrador existente
  modificar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, password, correo } = req.body;
      db.query(
        `UPDATE cotizaciones.administrador 
         SET nombre = ?, password = ?, correo = ? 
         WHERE id_administrador = ?;`,
        [nombre, password, correo, id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Administrador actualizado exitosamente" });
          } else {
            res.status(404).json({ message: "Administrador no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un administrador
  baja(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `DELETE FROM cotizaciones.administrador WHERE id_administrador = ?`, [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Administrador eliminado exitosamente" });
          } else {
            res.status(404).json({ message: "Administrador no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Autenticar administrador (inicio de sesión)
  autenticar(req, res) {
    try {
      const { nombre, password } = req.body;
      db.query(
        `SELECT * FROM cotizaciones.administrador WHERE nombre = ? AND password = ?`,
        [nombre, password],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.length === 1) {
            res.status(200).json({ message: "Autenticación exitosa", administrador: rows[0] });
          } else {
            res.status(401).json({ message: "Nombre o contraseña incorrectos" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default AdministradorController;
