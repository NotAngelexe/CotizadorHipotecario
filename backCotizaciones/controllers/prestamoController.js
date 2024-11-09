import db from '../database/conexion.js';

class PrestamoController {
  constructor() {}

  // Consultar todos los préstamos
  consultar(req, res) {
    try {
      db.query(
        `SELECT * FROM cotizaciones.prestamo`,
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

  // Consultar un préstamo por ID
  consultaByID(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `SELECT * FROM cotizaciones.prestamo WHERE id_prestamo = ?`, [id],
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

  // Crear un nuevo préstamo
  alta(req, res) {
    try {
      const { fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id } = req.body;
      db.query(
        `INSERT INTO cotizaciones.prestamo 
          (fecha_alta, fecha_baja, fecha_modificacion, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id) 
         VALUES (NOW(), ?, NOW(), ?, ?, ?, ?, ?);`,
        [fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id],
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

  // Modificar un préstamo existente
  modificar(req, res) {
    try {
      const { id } = req.params;
      const { fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id } = req.body;
      db.query(
        `UPDATE cotizaciones.prestamo 
         SET fecha_baja = ?, fecha_modificacion = NOW(), cantidad_prestamo = ?, pago_mensual = ?, tipo_prestamo = ?, id_banco = ?, cliente_id = ? 
         WHERE id_prestamo = ?;`,
        [fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id, id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Préstamo actualizado exitosamente" });
          } else {
            res.status(404).json({ message: "Préstamo no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un préstamo
  baja(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `DELETE FROM cotizaciones.prestamo WHERE id_prestamo = ?`, [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
          } else if (rows.affectedRows === 1) {
            res.status(200).json({ message: "Préstamo eliminado exitosamente" });
          } else {
            res.status(404).json({ message: "Préstamo no encontrado" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default PrestamoController;
