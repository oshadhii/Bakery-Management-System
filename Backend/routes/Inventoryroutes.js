const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/inventory');
const sendStock = require('../models/SendStock');
const Order = require('../models/OrderRequest');
const cors = require('cors');
const InventoryUser = require('../models/AdminLogin'); // Import User model


const users = []; // Mock user database

app.use(bodyParser.json());
app.use(cors());

//create data
router.post('/inventory/save', async (req, res) => {
    try {

        const{inventory} = req.body;
        const newPost = new Post({
            inventory
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            inventory: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



//Read Data

router.get('/inventory', async (req, res) => {
    try {
        const posts = await Post.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.put("/inventory/update/:id", async (req, res) => {
    const { id } = req.params;
    const { addQuantity } = req.body;

    console.log("Update request received for ID:", req.params.id);
    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await Post.findOneAndUpdate(
            { _id: objectId },
            { 'inventory.addQuantity': addQuantity },
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








//delete data
router.delete("/inventory/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id).exec();

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});




/*--------------Send Stock Create and Read Section-------------------*/

router.post('/sendstock/save', async (req, res) => {
    try {

        const{stock} = req.body;
        const newPost = new sendStock({
            stock
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            stock: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/sendstock', async (req, res) => {
    try {
        const posts = await sendStock.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.delete("/sendstock/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await sendStock.findByIdAndDelete(req.params.id).exec();

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


/*---------------Order Request Create and Read Section-------------------*/

router.post('/supplierrequest/save', async (req, res) => {
    try {

        const{order} = req.body;
        const newPost = new Order({
            order
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            order: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/supplierrequest', async (req, res) => {
    try {
        const posts = await Order.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.delete("/supplierrequest/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await Order.findByIdAndDelete(req.params.id).exec();

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



/*--------------------------Login-----------------------------*/
// Routes

/**
 * @route   POST /inventoryuser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/InventoryUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await InventoryUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new InventoryUser({
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
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await InventoryUser.findOne({ username });
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


