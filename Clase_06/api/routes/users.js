const express = require("express");
const db = require("../db");
const router = express.Router();

// Registrar usuario (POST /api/users)
router.post("/", (req, res) => {
  const { task, dueDate } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  db.run(
    `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`,
    [name, email, password, phone || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
    }
  );
});

router.get("/", (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


module.exports = router;
