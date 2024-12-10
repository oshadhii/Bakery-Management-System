const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    products: [
        {
            productName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            unitPrice: { 
                type: Number,
                required: true,
            },
        },
    ],
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
