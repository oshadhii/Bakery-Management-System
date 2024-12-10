const express = require('express');
const router = express.Router();
const Order = require('../models/postmethod');
const nodemailer = require('nodemailer');
const { default: mongoose } = require('mongoose');
const OrderUser = require('../models/OrderLogin')


/*router.route("/create").post((req,res)=>{  //array function, arow function
    const = req.body.
})  */  
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any other service or custom SMTP server
        auth: {
            user: 'miyurasabkommalmi@gmail.com', // Your email
            pass: 'lktnwvjdpirineay' ,// Your email password or App-specific password
            logger: true,  // Enable logging
            debug: true    // Show debug output
        }
    });
    

//create data

router.post('/wholesaleOrder/create',async(req, res)=>{  //request and response 
    try{
        const{WholesaleOrder} = req.body; //body ekn reques kergnnva data.
        const newPost = new Order( 
            {
                WholesaleOrder
            }     //kamathi object ekk hadagnne,
            
        )
        await newPost.save();  //save kergnne kiela request ekk denva save function eke use kerela
        return res.status(200).json({            
            success: "Data Saved Successfully",   
            wholsesaleorderdetails:newPost     
        });

    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }
});

/*
router.post('/order/create', async (req, res) => {
    try {
      const { WholesaleOrder } = req.body;
      console.log('Received order data:', WholesaleOrder); // Log received data
      const newPost = new Order(WholesaleOrder);
      await newPost.save();
      return res.status(200).json({
        success: "Data Saved Successfully",
        wholsesaleorderdetails: newPost
      });
    } catch (err) {
      console.error('Error occurred during order creation:', err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  });
  */


//read data      route kiyene function eke thiye....get kiyene http request method eke.
router.get("/wholesaleOrder", async(req, res)=>{
    try{
        const posts = await Order.find().exec();       //udeme declare kerpu Order name ekefetch all documents from the post collection in the MongoDB database.
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
router.put("/wholesaleOrder/update/:id",async(req, res)=>{
    try{
        const{ id } = req.params;
        const{ status } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatePost = await Order.findOneAndUpdate(
            {_id: objectId},  // The ID of the document to update
            {'WholesaleOrder.status':status},
            { new: true }
        );

        if(!updatePost){
            return res.status(404).json({
                error: "Order not found"
            });
        }

        // Check if the status is confirmed, then send an email
        if (status === 'Confirmed') {
            const orderId = updatePost.WholesaleOrder.orderId;
            const customerID = updatePost.WholesaleOrder.customerID;
            const customerName = updatePost.WholesaleOrder.customerName;
            const products = updatePost.WholesaleOrder.products; 
            const Date = updatePost.WholesaleOrder.deliveryDate;

            // Generate products information for the email
            let productDetails = '';
            products.forEach(product => {
                productDetails += `
                Product: ${product.product}
                Quantity: ${product.quantity} ${product.uom}
                Unit Price: ${product.unitPrice}
                Amount: ${product.amount}
                `;
            });

            const mailOptions = {
                from: 'miyurasabkommalmi@gmail.com',
                to: 'miyurasabkdelivery@gmail.com', // Email address of the production team
                cc: 'miyurasabakersproduction@gmail.com',
                cc: 'nshehara0921@gmail.com',
                subject: `New Wholsale Order Placed - Order ID: ${orderId}`,
                text: `A new order has been confirmed. Here are the details:
                   Order Type: Wholesale Order
                   Order ID: ${orderId}
                   Customer ID: ${customerID}
                   Customer Name: ${customerName}
                   Products: ${productDetails}
                   Delivery Date: ${Date}`
                   ,
            };

            // Send email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }










            return res.status(200).json({
                success: "Data Updated Successfully",
                data:updatePost 
            });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });

    }
});

//delete
router.delete("/wholesaleOrder/delete/:id",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const deleteOrder =await Order.findByIdAndDelete(req.params.id).exec();
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



/*--------------------------Login-----------------------------*/
// Routes

/**
 * @route   POST /OrderUser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/OrderUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await OrderUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new OrderUser({
        username,
        password
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
  
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  /**
   * @route   POST /login
   * @desc    Authenticate user and return success message
   * @access  Public
   */
router.post('/Orderlogin', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await OrderUser.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Validate password
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Successful login
      res.status(200).json({ message: `Welcome, ${user.username}! You have successfully logged in.` });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  /**
   * @route   GET /inventory-data
   * @desc    Retrieve inventory data (protected route)
   * @access  Public for simplicity
   */
  router.get('/Order-data', (req, res) => {
    // For simplicity, we're not implementing authentication here
    res.json({ data: 'Here is your inventory data!' });
  });





//delete
/*router.delete("/order/status/:status",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const status = req.params.status;

        // Find all orders with the given status
        const orders = await Order.find({ "WholesaleOrder.status": status }).exec();
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
});*/

module.exports = router; //export the module