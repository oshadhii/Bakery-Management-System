const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    order:{
        date: {
            type: String,
            require: true,
            unique: true,
        },

        ingredientCode: {
            type: String,
            require: true,
        },
        ingredientName:{
            type: String,
            require: true,
        },

        orderQuantity:{
            type: String,
            require: true,
        },
    }
    
    

});

const posts = mongoose.model('supplierrequest', postSchema);
module.exports = posts;
