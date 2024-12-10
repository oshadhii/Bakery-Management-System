const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  targetPlan:{

    date:{
      type: String,
      required: true,
    },   

    productID:{
      type: String,
      required: true,
    },

    predictedQuantity:{
      type:String,
      required: true,
    },
  }
});

const saleplan = mongoose.model('saleplan', postSchema);
module.exports = saleplan;

/*products:[{
            productID: {
                type: String,
                required: true,
            },
            predictedQuantity: {
                type: String, 
                required: true,
              },
            
          }]*/

        
