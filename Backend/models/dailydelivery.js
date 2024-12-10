const mongoose=require('mongoose');
const DailySchema=new mongoose.Schema({
dailydelivery:{
    date:{type:String},
    vehicleno:{type:String},
    drivername:{type:String},
    products:[{
        product:{type:String,required:true},
        quantity:{type:String,required:true},
        unitprice:{type:String,required:true},
        totalprice:{type:String,required:true},
    }],
}



},{timestamps:true});
module.exports=mongoose.model('deliverysales',DailySchema)
