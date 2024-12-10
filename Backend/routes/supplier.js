const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Supplier = require('../models/Supplier');
const SupplierUser = require('../models/supplierLogin')
const Cors = require('cors');

app.use(Cors());

router.post('/SupplierTable/save', async (req, res) =>{
    try{
        const {supplierTable} = req.body;
        const newPost = new Supplier({
            supplierTable
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data added successfully",
            supplierTable : newPost
        });
    } catch(err){
        return res.status(400).json({
            error: err.message,
        });

    }
});

// read data

router.get("/SupplierTable/read",async(req, res)=>{
    try{
        const posts=await Supplier.find().exec();
        return res.status(200).json({
            success:true,
            supplier:posts

        });
    }catch(err){
        return res.status(400).json({
         error:err.message   
      });
    }

});

// update

router.put("/SupplierTable/update/:id", async (req, res) => {
    const { id } = req.params;
    const { email, mobileNumber } = req.body;
    console.log("Update request received for ID:", req.params.id);
    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await Supplier.findOneAndUpdate(
            { _id: objectId },
            { 'supplierTable.email': email,'supplierTable.mobileNumber': mobileNumber },
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
});

// delete

router.delete("/SupplierTable/delete/:id",async(req, res)=>{
    try{

        const deletePost = await Supplier.findByIdAndDelete(req.params.id).exec();

        if(!deletePost){
            return res.status(404).json({
                error:"Post not found"
            });
        }
        return res.status(200).json({
            success: "DData Delete successfully",
            data: deletePost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }
});


/*--------------------------Login-----------------------------*/
// Routes

/**
 * @route   POST /SupplierUser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/SupplierUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await SupplierUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new SupplierUser({
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
router.post('/Supplierlogin', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await SupplierUser.findOne({ username });
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
  router.get('/inventory-data', (req, res) => {
    // For simplicity, we're not implementing authentication here
    res.json({ data: 'Here is your inventory data!' });
  });



module.exports = router;
