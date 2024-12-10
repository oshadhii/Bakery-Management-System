// routes/ingredientRequests.js
const express = require('express');
const router = express.Router();
const IngredientRequest = require('../models/IngredientRequest');

// Create a new ingredient request
router.post('/add', async (req, res) => {
  const newRequest = new IngredientRequest({
    ingredients: req.body.ingredients,
    totalCost: req.body.totalCost,
    managerEmail: req.body.managerEmail,
    status: 'Pending'
  });

  try {
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all ingredient requests
router.get('/', async (req, res) => {
  try {
    const requests = await IngredientRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the status of an ingredient request
router.put('/:id', async (req, res) => {
  try {
    const request = await IngredientRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = req.body.status || request.status;
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
