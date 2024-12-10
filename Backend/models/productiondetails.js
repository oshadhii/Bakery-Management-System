const mongoose = require('mongoose');

const SalesproductionSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  unitCost: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
});

const SalesProduction = mongoose.model('production', SalesproductionSchema);

module.exports = SalesProduction;
