const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    inventory:{
        itemCode: {
            type: String,
            required: true,
            unique: true,
            
        },
        itemName:{
            type: String,
            required: true,
        },

        unitPrice:{
            type: Number,
            required: true
        },

        stockType:{
            type: String,
            required: true,
        },

        addQuantity:{
            type: String,
            required: true,
        },
        reOrder:{
            type: String,
            required: true,
        },

    }
    
    

});

const posts = mongoose.model('inventory', postSchema);
module.exports = posts;

