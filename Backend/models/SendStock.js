const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    stock:{
        date: {
            type: String,
            require: true,
            unique: true,
        },

        ingredientCode: {
            type: String,
            required: true,
            unique: true,
        },
        ingredientName:{
            type: String,
            required: true,
        },

        unitPrice:{
            type: Number,
            required: true
        },

        sendQuantity:{
            type: String,
            required: true,
        },
    }
    
    

});

const posts = mongoose.model('sendstock', postSchema);
module.exports = posts;
