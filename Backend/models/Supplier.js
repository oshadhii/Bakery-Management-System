const mongoose = require("mongoose");
const SupplierSchema = new mongoose.Schema({
    supplierTable:{
        companyName: {
            type:String,
            required: true
        },
        companyAddress: {
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        mobileNumber:{
            type: String,
            required: true
        },
        businessRegistrationNumber:{
            type: String,
            required: true
        },
        supplierType:{
            type: String,
            required: true
        },
        productCategories:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
    }
});

const Supplier = mongoose.model('SupplierTable', SupplierSchema);
module.exports = Supplier;
