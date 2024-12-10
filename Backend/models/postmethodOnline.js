const mongoose = require('mongoose');  //import kergnnva mongoose eke rquire keyword eke use kerela ek assign kerngnnva const kiela variable ekk hdela
const { v4: uuidv4 } = require('uuid'); 
const schema = mongoose.Schema;


const OnlineOrderSchema  = new schema({
    OnlineOrder: {
        orderId: { type: String, default: uuidv4 },
        customerName : {type:String, required:true},
        phoneNumber : {type:Number, required:true},
        address : {type:String, required:true},
        paymentMethod : {type:String, required:true},
        cartItems: [{
                productName : {type:String },
                unitPrice : {type:Number },
                quantity: {type:Number }
        }],
        totQuantity : {type:Number},
        totPrice: {type:Number},
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['Pending', 'Confirmed', 'Prepared', 'Delivered', 'Cancelled'], default: 'Pending' },
    }
}, { timestamps: true });


const OnlineOrder = mongoose.model('onlineorder',OnlineOrderSchema)
module.exports=OnlineOrder;

//onlineorder --> me name eke gnne post method ekedi api pass kernr name eke router.post('/onlineorder/create',async(req, res)=>