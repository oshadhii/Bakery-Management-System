const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    orderTable:{
        companyName: {
            type:String,
            required: true
        },
        date: {
            type:String,
            required: true
        },
        productCategories:{
            type: String,
            required: true
        },
        quantity:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
    }
});

const Order = mongoose.model('Supplierorder', OrderSchema);
module.exports = Order;
