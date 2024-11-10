import db from '../database/conexion.js';

/**
 * Controlador para la gestión de los bancos en la base de datos.
 */
class BancoController {
  constructor() {}

  /**
   * Consulta todos los bancos.
   * @param {object} req - Objeto de solicitud.
   * @param {object} res - Objeto de respuesta.
   */
  consultar(req, res) {
    try {
      db.query(`SELECT * FROM cotizaciones.banco`, (err, rows) => {
        if (err) {
          return res.status(400).json({ error: err.sqlMessage });
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Consulta un banco por su ID.
   * @param {object} req - Objeto de solicitud con el ID del banco en los parámetros.
   * @param {object} res - Objeto de respuesta.
   */
  consultaByID(req, res) {
    const { id } = req.params;
    try {
      db.query(`SELECT * FROM cotizaciones.banco WHERE id_banco = ?`, [id], (err, rows) => {
        if (err) {
          return res.status(400).json({ error: err.sqlMessage });
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Obtiene los plazos disponibles para un banco específico.
   * @param {object} req - Objeto de solicitud con el ID del banco en los parámetros.
   * @param {object} res - Objeto de respuesta.
   */
  getPlazosByBanco(req, res) {
    const { id } = req.params;

    try {
      db.query(
        `SELECT plazo.id_plazo, plazo.anios
         FROM cotizaciones.banco_plazo
         JOIN cotizaciones.plazo ON banco_plazo.id_plazo = plazo.id_plazo
         WHERE banco_plazo.id_banco = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
            return;
          }
          if (rows.length === 0) {
            res.status(404).json({ message: "No hay plazos para este banco" });
            return;
          }
          res.status(200).json(rows);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Crea un nuevo banco.
   * @param {object} req - Objeto de solicitud con los datos del nuevo banco.
   * @param {object} res - Objeto de respuesta.
   */
  alta(req, res) {
    const { nombre_banco, interes, enganche } = req.body;
    try {
      db.query(
        `INSERT INTO cotizaciones.banco (nombre_banco, interes, enganche) VALUES (?, ?, ?);`,
        [nombre_banco, interes, enganche],
        (err, rows) => {
          if (err) {
            return res.status(400).json({ error: err.sqlMessage });
          }
          res.status(201).json({ id: rows.insertId, message: "Banco creado exitosamente" });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Modifica un banco existente.
   * @param {object} req - Objeto de solicitud con los datos actualizados y el ID del banco.
   * @param {object} res - Objeto de respuesta.
   */
  modificar(req, res) {
    const { id } = req.params;
    const { nombre_banco, interes, enganche } = req.body;
    try {
      db.query(
        `UPDATE cotizaciones.banco SET nombre_banco = ?, interes = ?, enganche = ? WHERE id_banco = ?;`,
        [nombre_banco, interes, enganche, id],
        (err, rows) => {
          if (err) {
            return res.status(400).json({ error: err.sqlMessage });
          }
          if (rows.affectedRows == 1) {
            res.status(200).json({ message: "Banco actualizado exitosamente" });
          } else {
            res.status(404).json({ message: "Banco no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Elimina un banco (comentado).
   * @param {object} req - Objeto de solicitud con el ID del banco.
   * @param {object} res - Objeto de respuesta.
   */
  // baja(req, res) {
  //   const { id } = req.params;
  //   try {
  //     db.query(`DELETE FROM cotizaciones.banco WHERE id_banco = ?`, [id], (err, rows) => {
  //       if (err) {
  //         return res.status(400).json({ error: err.sqlMessage });
  //       }
  //       if (rows.affectedRows == 1) {
  //         res.status(200).json({ message: "Banco eliminado exitosamente" });
  //       } else {
  //         res.status(404).json({ message: "Banco no encontrado" });
  //       }
  //     });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }
}

export default BancoController;
