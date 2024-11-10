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

  //Obtiene el prestamo por id
  getTipoPrestamoById(req, res) {
    const { id } = req.params;

    try {
      db.query(
        `SELECT tipo_prestamo.id_tipo_prestamo, tipo_prestamo.nombre_prestamo
         FROM cotizaciones.prestamo
         JOIN cotizaciones.tipo_prestamo ON prestamo.tipo_prestamo = tipo_prestamo.id_tipo_prestamo
         WHERE prestamo.id_prestamo = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
            return;
          }
          if (rows.length === 0) {
            res.status(404).json({ message: "No loan type found for this loan" });
            return;
          }
          res.status(200).json(rows[0]);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //consultar los tipos de prestamos
  getTipoPrestamo(req, res) {
    try {
      db.query(
        `SELECT * FROM cotizaciones.tipo_prestamo;`,
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.sqlMessage });
            return;
          }
          if (rows.length === 0) {
            res.status(404).json({ message: "No loan type found for this loan" });
            return;
          }
          res.status(200).json(rows);
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

  //calcular el prestamos y dar los datos
  solicitarPrestamo(req, res) {
    const { id_cliente, id_tipo_prestamo, monto_prestamo, id_banco, plazo_anos, tasa_anual, porcentaje_enganche } = req.body;

    // Paso 1: Obtener el sueldo del cliente
    db.query(`SELECT sueldo FROM cotizaciones.cliente WHERE id_cliente = ?`, [id_cliente], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.sqlMessage });
        return;
      }
      
      if (rows.length === 0) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }
      
      const sueldo = rows[0].sueldo;
      const limite_mensual = sueldo * 0.4;
      const r = tasa_anual / 12 / 100;
      const n = plazo_anos * 12;

      // Si el tipo de préstamo es 1, calcular el préstamo con el monto solicitado
      if (id_tipo_prestamo === 1) {
        // Paso 2: Calcular el monto real del préstamo restando el enganche
        const monto_real_prestamo = monto_prestamo * (1 - porcentaje_enganche / 100);

        // Paso 3: Calcular la mensualidad usando la fórmula PMT
        const pago_mensual = (monto_real_prestamo * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        // Paso 4: Verificar si la mensualidad excede el 40% del sueldo
        if (pago_mensual > limite_mensual) {
          const sueldo_necesario = (pago_mensual / 0.4).toFixed(2);
          res.status(400).json({
            message: `El sueldo actual no permite cubrir este préstamo. El cliente debería ganar al menos $${sueldo_necesario} para ser elegible.`,
          });
          return;
        }

        // Paso 5: Insertar el préstamo en la base de datos
        db.query(
          `INSERT INTO cotizaciones.prestamo (fecha_alta, fecha_modificacion, cliente_id, tipo_prestamo, cantidad_prestamo, id_banco, pago_mensual,mensualidades)
           VALUES (NOW(), NOW(), ?, ?, ?, ?, ?,?)`,
          [id_cliente, id_tipo_prestamo, monto_real_prestamo, id_banco, pago_mensual,n],
          (err, result) => {
            if (err) {
              res.status(500).json({ error: err.sqlMessage });
              return;
            }
            res.status(201).json({
              message: "Préstamo solicitado exitosamente",
              pago_mensual: pago_mensual.toFixed(2),
            });
          }
        );
      } 
      
      // Si el tipo de préstamo es 2, calcular el monto máximo del préstamo en función del sueldo
      else if (id_tipo_prestamo === 2) {
        // Paso 2: Calcular el monto máximo del préstamo usando la fórmula despejada para P
        const monto_maximo = (limite_mensual * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

        // Paso 3: Insertar el préstamo con el monto máximo calculado en la base de datos
        db.query(
          `INSERT INTO cotizaciones.prestamo (fecha_alta, fecha_modificacion, cliente_id, tipo_prestamo, cantidad_prestamo, id_banco, pago_mensual,mensualidades)
           VALUES (NOW(), NOW(), ?, ?, ?, ?, ?, ?)`,
          [id_cliente, id_tipo_prestamo, monto_maximo, id_banco, limite_mensual,n],
          (err, result) => {
            if (err) {
              res.status(500).json({ error: err.sqlMessage });
              return;
            }
            res.status(201).json({
              message: "Préstamo solicitado exitosamente con monto máximo calculado",
              monto_maximo: monto_maximo.toFixed(2),
              pago_mensual: limite_mensual.toFixed(2),
            });
          }
        );
      } else {
        res.status(400).json({ message: "Tipo de préstamo no válido" });
      }
    });
  }
  

  // Consultar un préstamo por ID cliente
  consultaByIdCliente(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `SELECT * FROM cotizaciones.prestamo WHERE cliente_id = ?`, [id],
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
      const { fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id,mensualidades } = req.body;
      db.query(
        `UPDATE cotizaciones.prestamo 
         SET fecha_baja = ?, fecha_modificacion = NOW(), cantidad_prestamo = ?, pago_mensual = ?, tipo_prestamo = ?, id_banco = ?, cliente_id = ?,mensualidades=?, 
         WHERE id_prestamo = ?;`,
        [fecha_baja, cantidad_prestamo, pago_mensual, tipo_prestamo, id_banco, cliente_id, id,mensualidades],
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
