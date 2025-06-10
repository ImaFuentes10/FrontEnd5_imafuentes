const express = require("express");

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();


/* Crear un todo (POST /api/todos) */
router.post("/", (req, res) => {
  const { user_id, task, dueDate } = req.body;
  if (!user_id || !task || !dueDate)
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  db.run(
    `INSERT INTO todos (user_id, task, dueDate) VALUES (?, ?, ?)`,
    [user_id, task, dueDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, user_id, task, dueDate, done: 0 });
    }
  );
});


/* Obtiene todos (GET /api/todos) */
router.get("/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.all(`SELECT * FROM todos WHERE user_id = ?`, [user_id], (err, rows) => {
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
