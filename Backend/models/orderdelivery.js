const mongoose=require('mongoose');//mongose dagtta
const Deliveryschema =new mongoose.Schema({//schema ekaii hdnne meka athule okkom table

OrderDelivery:{//table eka
    orderid:{
        type: String},
    orderlocation:{
        type:String
    },
    ordertype:{
        type:String
    },

    assigneddriver:{
        type:String
    },
    diliveryvehicle:{
        type:String
    },
    diliverydate:{
        type:String
    },
    diliverystatus:{
        type:String
    }
        
}

});

module.exports=mongoose.model('deliveryorder',Deliveryschema)//export krna eka
