const express = require('express');
const db = require("../db");
const router = express.Router()

//registrar usuario (POST /api/users)
router.post('/', (req, res) => {
    const {name, email, password, phone} = req.body;
    if (!name || !email || !password) 
        return res.status(400).json({error: 'Faltan datos obligatorios'});
    
})