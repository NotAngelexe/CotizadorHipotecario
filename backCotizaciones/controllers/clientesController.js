import db from '../database/conexion.js';

/**
 * Controlador para la gestión de los clientes en la base de datos.
 */
class ClienteController {
  constructor() {}

  /**
   * Valida el formato del RFC.
   * @param {string} rfc - RFC a validar.
   * @returns {boolean} - Verdadero si el RFC es válido.
   */
  validarRFC(rfc) {
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/i;
    return rfcRegex.test(rfc);
  }

  /**
   * Valida el formato del correo electrónico.
   * @param {string} correo - Correo a validar.
   * @returns {boolean} - Verdadero si el correo es válido.
   */
  validarCorreo(correo) {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correoRegex.test(correo);
  }

  /**
   * Valida el formato de la contraseña.
   * @param {string} password - Contraseña a validar.
   * @returns {boolean} - Verdadero si la contraseña es válida.
   */
  validarPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Crea un nuevo cliente.
   * @param {object} req - Objeto de solicitud con los datos del cliente.
   * @param {object} res - Objeto de respuesta.
   */
  alta(req, res) {
    try {
      const { nombre, rfc, edad, sueldo, fecha_baja, telefono, correo, password } = req.body;

      // Validaciones
      if (edad < 18) {
        return res.status(400).json({ error: "La edad debe ser mayor o igual a 18 años" });
      }
      if (!this.validarRFC(rfc)) {
        return res.status(400).json({ error: "Formato de RFC inválido" });
      }
      if (!this.validarCorreo(correo)) {
        return res.status(400).json({ error: "Formato de correo inválido" });
      }
      if (sueldo <= 0) {
        return res.status(400).json({ error: "El sueldo debe ser mayor a 0" });
      }
      if (!this.validarPassword(password)) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres, incluir letras, números y caracteres especiales" });
      }

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

  /**
   * Consulta todos los clientes.
   * @param {object} req - Objeto de solicitud.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Consulta un cliente por su ID.
   * @param {object} req - Objeto de solicitud con el ID del cliente en los parámetros.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Modifica un cliente existente.
   * @param {object} req - Objeto de solicitud con los datos actualizados y el ID del cliente.
   * @param {object} res - Objeto de respuesta.
   */
  modificar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, rfc, edad, sueldo, telefono, correo, password } = req.body;

      // Validaciones
      if (edad < 18) {
        return res.status(400).json({ error: "La edad debe ser mayor o igual a 18 años" });
      }
      if (!this.validarRFC(rfc)) {
        return res.status(400).json({ error: "Formato de RFC inválido" });
      }
      if (!this.validarCorreo(correo)) {
        return res.status(400).json({ error: "Formato de correo inválido" });
      }
      if (sueldo <= 0) {
        return res.status(400).json({ error: "El sueldo debe ser mayor a 0" });
      }
      if (!this.validarPassword(password)) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres, incluir letras, números y caracteres especiales" });
      }

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

  /**
   * Elimina un cliente.
   * @param {object} req - Objeto de solicitud con el ID del cliente.
   * @param {object} res - Objeto de respuesta.
   */
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

  /**
   * Autentica un cliente (inicio de sesión).
   * @param {object} req - Objeto de solicitud con el correo y la contraseña del cliente.
   * @param {object} res - Objeto de respuesta.
   */
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
