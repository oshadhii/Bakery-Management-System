const express = require('express');
const router = express.Router();
const Production = require('../models/Production');
const ProductUser = require('../models/productLogin')

// GET all productions
router.get('/', async (req, res) => {
    try {
        const productions = await Production.find();
        res.json(productions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new production record
router.post('/', async (req, res) => {
    const { date, products } = req.body;

    const newProduction = new Production({
        date,
        products,
    });

    try {
        const savedProduction = await newProduction.save();
        res.status(201).json(savedProduction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;
