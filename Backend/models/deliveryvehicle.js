const mongoose=require('mongoose');//mongose dagtta
const Vehicleschema =new mongoose.Schema({//schema ekaii hdnne meka athule okkom table

VehicleDriver:{//table eka
    vehicleid:{
        type: String
    },
    vehicletype:{
        type:String
    },
    vehiclenumber:{
        type:String
    },
    driverid:{
        type:String
    },
    drivername:{
        type:String
    },
    driverconno:{
        type:String
    }
        
}

});

module.exports=mongoose.model('deliveryvehicle',Vehicleschema)//export krna eka
