const mongoose = require('mongoose');

const ingredientRequestSchema = new mongoose.Schema({
  ingredients: [
    {
      name: String,
      quantity: Number,
      costPerUnit: Number,
      totalCost: Number,
    },
  ],
  totalCost: Number,
  managerEmail: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('IngredientRequest', ingredientRequestSchema);
