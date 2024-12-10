const express=  require('express');
const router = express.Router();
const post= require('../models/Customer');
const cors = require('cors');
const mongoose = require('mongoose')
const CustomerUser = require('../models/customerLogin')



//create  data
router.post('/customer/save', async (req, res)=>{
    try{

        const{customer}= req.body;
        const newpost = new post({
            customer
        })

        await newpost.save();
        return res.status(200).json({
            success: "Data saved successfully"
        });

    } catch(err){
        return res.status(400).json({
            error: err.message
        }); 
    }
});
//read 
router.get("/posts", async (req, res) => {
    try{
        const posts = await post.find().exec();
        return res.status(200).json({
            success: "Data showing successfully",
            data: posts
        });
    } catch(err){
        return res.status(400).json({
            error: err.message
        });
    }
});




router.put("/posts/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { Address } = req.body;
    const { Phone_number } = req.body;
    const { Email } = req.body;
    const { user_name } = req.body;
    const { password } = req.body;

    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await post.findOneAndUpdate(
            { _id: objectId },
            { 'customer.name': name, 'customer.Address':Address, 'customer.Phone_number':Phone_number, 'customer.Email': Email, 'customer.user_name': user_name, 'customer.password': password},
            { new: true } // Return the updated document
        )
    
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            updatedPost: updatedPost // Send the updated post data
        });
        

    }

        catch (err) {
            return res.status(400).json({
                error: err.message
            });
        }

})
//update
/*router.put("/posts/update/:id", async (req, res)=>{
    try{
        const updatedpost = await post.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );

        if(!updatedpost){
            return res.status(404).json({
                error: "post not found"
            });
        }
        return res.status(200).json({
            success:"Data updated successfully",
            data: updatedpost
        });

    } catch(err){
        return res.status(400).json({

        });
    }
});*/
//delete
    router.delete("/posts/delete/:id",async(req, res)=>{
        try{

            const deleteOrder = await post.findByIdAndDelete(req.params.id).exec();

            if(!deleteOrder){
                return res.status(404).json({
                    error:"order not found"
                });
            }
            return res.status(200).json({
                success: "DData Delete successfully",
                data: deleteOrder
            });
        }catch(err){
            return res.status(400).json({
                error:err.message
            });
        }
    }) ;

    /*inquary create eka
    router.post('/customer/save', async (req, res)=>{
    try{

        const{customer}= req.body;
        const newpost = new post({
            customer
        })

        await newpost.save();
        return res.status(200).json({
            success: "Data saved successfully"
        });

    } catch(err){
        return res.status(400).json({
            error: err.message
        }); 
    }
});*/

/*--------------------------Login-----------------------------*/
// Routes

/**
 * @route   POST /inventoryuser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/CustomerUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await CustomerUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new CustomerUser({
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
router.post('/Customerlogin', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await CustomerUser.findOne({ username });
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
  router.get('/Customer-data', (req, res) => {
    // For simplicity, we're not implementing authentication here
    res.json({ data: 'Here is your Customer data!' });
  });
  



module.exports=router;