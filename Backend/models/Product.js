const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productCode:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    }

});

    const Product = mongoose.model('Product', productSchema);

    module.exports = Product;