const express = require('express');
const router = express.Router();
const onlineOrder = require('../models/postmethodOnline');
const nodemailer = require('nodemailer');
const { default: mongoose } = require('mongoose');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any other service or custom SMTP server
    auth: {
        user: 'miyurasabkommalmi@gmail.com', // Your email
        pass: 'lktnwvjdpirineay' ,// Your email password or App-specific password
        logger: true,  // Enable logging
        debug: true    // Show debug output
    }
});

router.post('/onlineorder/create',async(req, res)=>{  //request and response 
    try{
        const{OnlineOrder} = req.body; //body ekn reques kergnnva data.
        const newPost = new onlineOrder( 
            {
                OnlineOrder
            }     //kamathi object ekk hadagnne,
            
        )


       
       
        await newPost.save();  //save kergnne kiela request ekk denva save function eke use kerela
     

        
        return res.status(200).json({            
            success: "Data Saved Successfully",   
            Onlineorderdetails:newPost     
        });

        

    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }
});

router.get("/onlineorder", async(req, res)=>{
    try{
        const posts = await onlineOrder.find().exec();       //udeme declare kerpu Order name ekefetch all documents from the post collection in the MongoDB database.
        return res.status(200).json({            
            success: true,
            ReadData:posts       
        });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }

});

//update data
router.put("/onlineorder/update/:id",async(req, res)=>{
    try{
        const{ id } = req.params;
        const{ status } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatePost = await onlineOrder.findOneAndUpdate(
            {_id: objectId},  // The ID of the document to update
            {'OnlineOrder.status':status},
            { new: true }
        );

        if(!updatePost){
            return res.status(404).json({
                error: "Order not found"
            });
        }

         // Check if the status is confirmed, then send an email
         if (status === 'Confirmed') {
            const orderId = updatePost.OnlineOrder.orderId;
            const customerName = updatePost.OnlineOrder.customerName;
            const address = updatePost.OnlineOrder.address;
            const totQuantity = updatePost.OnlineOrder.totQuantity;
            const Date = updatePost.OnlineOrder.createdAt;



            const mailOptions = {
                from: 'miyurasabkommalmi@gmail.com',
                to: 'miyurasabkdelivery@gmail.com', // Email address of the production team
                cc: 'miyurasabakersproduction@gmail.com',
        
                subject: `New Online Order Placed - Order ID: ${orderId}`,
                text: `A new order has been confirmed. Here are the details:
                   Order Type: Online Order
                   Order ID: ${orderId}
                   Customer Name: ${customerName}
                   Address: ${address}
                   Total Quantity: ${totQuantity}
                   Date: ${Date}`
                   ,
            };

            // Send email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                 // Respond with both status update and email sent confirmation
          
        }
        return res.status(200).json({
            success: "Data Updated Successfully, and email sent",
            data: updatePost
          });
      });
    } else {
      // Respond only with status update if no email needs to be sent
      return res.status(200).json({
        success: "Data Updated Successfully",
        data: updatePost
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

//delete
router.delete("/onlineorder/delete/:id",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const deleteOrder =await onlineOrder.findByIdAndDelete(req.params.id).exec();      //change
        if(!deleteOrder){
            return res.status(404).json({
                error: "Order not found"
            });
        }
        return res.status(200).json({
            success: "Data Deleted Successfully",
            data:deleteOrder
        });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });

    }
});



module.exports = router;
