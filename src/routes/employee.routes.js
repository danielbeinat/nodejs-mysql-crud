import { Router, json } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/api/user", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

// obtener empleado por id
router.get("/api/user/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "empleado no encontrado",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

// obtener empleado por nombre
router.get("/api/user/username/:nombre", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE nombre = ?", [
      req.params.nombre,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

router.post("/api/user", async (req, res) => {
  const { nombre, salario } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (nombre,salario) VALUES (?,?)",
      [nombre, salario]
    );

    res.send({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

router.patch("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, salario } = req.body;

  try {
    const [resultado] = await pool.query(
      "UPDATE employee SET nombre = IFNULL(?,nombre), salario = IFNULL(?,salario) WHERE id = ? ",
      [nombre, salario, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: "Empleado no encontrado",
      });
    }

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ? ", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

router.delete("/api/user/:id", async (req, res) => {
  try {
    const [resultado] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (resultado.affectedRows <= 0)
      return res.status(400).json({
        message: "empleado no encontrado",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
});

export default router;
