const express = require("express");

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();


/* Crear un todo (POST /api/todos) */
router.post("/", (req, res) => {
  const { task, dueDate } = req.body;
  if (!task || !dueDate)
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  db.run(
    `INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
    [task, dueDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
    }
  );
});


/* Obtiene todos (GET /api/todos) */
router.get("/", (req, res) => {
  db.all(`SELECT * FROM todos`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


/* Borra un todo (DELETE /api/todos) */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Todo no encontrado" });
    res.status(204).send();
  });
});


/* Cambia un todo (PUT /api/todos) */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { done } = req.body;
  db.run(
    `UPDATE todos SET done = ? WHERE id = ?`,
    [done ? 1 : 0, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Todo no encontrado" });
      res.status(200).json({ updated: this.changes });
    }
  );
});

module.exports = router;
