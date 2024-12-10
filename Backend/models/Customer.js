const mongoose = require ('mongoose');

const  postschema= new mongoose.Schema({
    customer:{
        name:{
            type: String,
            required: true
        },
        Address:{
            type: String,
            required: true
        },
        Phone_number:{
            type: Number,
            required: true
        },
        Email:{
            type: String,
            required: true
        },
        user_name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            unique:true
                                                                                                                                                                                 
        }
    }
});
module.exports=mongoose.model('customer',postschema);