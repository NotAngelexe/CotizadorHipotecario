import db from '../database/conexion.js';

/**
 * Controlador para la gestión de los administradores en la base de datos.
 */
class AdministradorController {
  constructor() {}

  /**
   * Consulta todos los administradores.
   * @param {object} req - Objeto de solicitud.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Consulta un administrador por su ID.
   * @param {object} req - Objeto de solicitud con el ID del administrador en los parámetros.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Crea un nuevo administrador.
   * @param {object} req - Objeto de solicitud con los datos del nuevo administrador.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Modifica un administrador existente.
   * @param {object} req - Objeto de solicitud con los datos actualizados y el ID del administrador.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Elimina un administrador.
   * @param {object} req - Objeto de solicitud con el ID del administrador.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Autentica a un administrador (inicio de sesión).
   * @param {object} req - Objeto de solicitud con el nombre y la contraseña del administrador.
   * @param {object} res - Objeto de respuesta.
   */
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
