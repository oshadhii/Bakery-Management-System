const mongoose = require('mongoose');  //import kergnnva mongoose eke rquire keyword eke use kerela ek assign kerngnnva const kiela variable ekk hdela
const schema = mongoose.Schema;

const SalesOrderSchema  = new schema({
    WholesaleOrder:{
        customerID: { type: String, required: true },
        customerName: { type: String, required: true },
        
        products: [{ 
          product: { type: String, required: true }, //backend ekete denne kalin require eke dnmame check kernva name kiyene property ekete value ek thiyede kiela
          quantity: { type: Number, required: true }, 
          uom: { type: String, required: true }, // Unit of Measure 
          unitPrice: { type: Number, required: true }, 
          amount: { type: Number, required: true } 
        }],
        totalAmount: { type: Number, required: true },
        orderSchedule: { type: String, required: true },
        deliveryDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['Pending', 'Confirmed', 'Prepared', 'Delivered', 'Cancelled'], default: 'Pending' },
    }

   
}, { timestamps: true });  //useful for keeping track of when records were created use degault date
 
const Saleswholesaleorders = mongoose.model('wholesaleorders',SalesOrderSchema)
module.exports=Saleswholesaleorders;  //meke mongo db ekete giame api capital dila thibboth okkoma simple venva thv s ekk add venva

//    /*ProductList;[
//     {
//         ProductName: String,
//          Quantity: String,
//         UOM: String,
//         UnitPrice: String,
//         Amount: String,
//     }
// ]*/