const mongoose = require ('mongoose');

const  inquirychema= new mongoose.Schema({
    inquiryTable:{
        Name:{
            type: String,
            required: true
        },
        Email:{
            type: String,
            required: true
        },
        Phone_Number:{
            type: Number,
            required: true
        },
        PreferredMethodOfResponse:{
            type: String,
            required: true
        },
        QuestionorConcerns:{
            type: String,
            required: true
        },
        status:{
            type: String,
            enum: ['Pending','Confirmed'], default:'Pending'
        },
    }
});
const Inquiry = mongoose.model('inquiry',inquirychema);
module.exports = Inquiry;