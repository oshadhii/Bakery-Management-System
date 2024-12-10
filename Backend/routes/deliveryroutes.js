const express=require('express');//express dagtta
const mongoose = require('mongoose');//mongose dagtta
const router=express.Router();//path hadagnna express eke router kyna eka gtta
const path = require('../models/orderdelivery')//full post.js file eka varible ekata dagtta
const path2 = require('../models/dailydelivery')//full post.js file eka varible ekata dagtta
const Vehicle = require('../models/deliveryvehicle');
const DeliveryUser = require('../models/deliveryLogin')
//create data
router.post('/deliveryorder/save', async(req,res)=>{
    try{
        const{OrderDelivery}=req.body;
        const newpost=new path({

            OrderDelivery


        })
        await newpost.save();
        return res.status(200).json({

            success:true,
            orderDelivery : newpost,
            message: "data added successfullyy.."
        });
    }
    catch(err){
        return res.status(400).json({
            error:err.message,
            message: "data added unsuccessfullyy.."
        });
    }


});


//Read Data
router.get("/deliveryorder",async(req,res)=>{
    try{
        const post=await path.find().exec();
        return res.status(200).json({
            success:true,
            mypost:post
        });
    }catch(err)
    {
        return res.status(400).json({
            error:err.message
        });
    }
    


});
//update eka 
/*router.put("/post/update/:id",async(req,res)=>{
    try{
        const updatedpost=await path.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}

        );

        if(!updatedpost){
            return res.status(404).json({
                error:"post not found"
            });
        }
        return res.status(200).json({
            success:"data updated successfully",
            data:updatedpost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});*/
//delete ekahh
router.delete("/deliveryorder/delete/:id",async(req,res)=>{
    try{
        const deleted=await path.findByIdAndDelete(req.params.id).exec();
        if(!deleted){
            return res.status(404).json({
                error:"not found"
            });
        }
        return res.status(200).json({
            success:true,
            data:deleted
        });
    }catch(err)
        {
            return res.status(200).json({
                error:err.message

        });
    }
    });
    //aluth update eka
    router.put("/deliveryorder/update/:id",async(req,res)=>{
        try{
            const{id}=req.params;
            const{diliverystatus}=req.body;
            const objectID= new mongoose.Types.ObjectId(id);
            const updatedpost=await path.findOneAndUpdate(
                {_id: objectID},
                {'OrderDelivery.diliverystatus':diliverystatus},
                {new:true}
                
          );
          if(!updatedpost){
            return res.status(404).json({
                error:"post not found"
            });
        }
        return res.status(200).json({
            success:"data updated successfully",
            data:updatedpost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});
   //--------------------------------------------------------------
   //sheage page ekah
   //create data
router.post('/deliverysales/save', async(req,res)=>{
    try{
        const{dailydelivery}=req.body;
        const newpost2=new path2({

            dailydelivery


        })
        await newpost2.save();
        return res.status(200).json({

            success:"successfull",
        });
    }
    catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});
//read ekah
router.get('/deliverysales', async (req, res) => {
    try {
        const sales = await path2.find(); // Fetch all sales
        return res.status(200).json({
            success: true,
            sales,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
//---------------vehicle page full crud-------------------------
// Create data
// Create data
router.post('/deliveryvehicle/save', async (req, res) => {
    try {
        const { VehicleDriver } = req.body;
        const newVehicle = new Vehicle({
            VehicleDriver
        });
        await newVehicle.save();
        return res.status(200).json({
            success: true,
            vehicle: newVehicle,
            message: "Vehicle data added successfully."
        });
    } catch (err) {
        return res.status(400).json({
            message: "Failed to add vehicle data."
        });
    }
});

// Read data
router.get('/deliveryvehicle', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().exec();
        return res.status(200).json({
            success: true,
            vehicles
        });
    } catch (err) {
    }
});

// Update data
router.put('/deliveryvehicle/update/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({
                error: "Vehicle not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle data updated successfully.",
            data: updatedVehicle
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

 
// Delete data
router.delete('/deliveryvehicle/delete/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id).exec();
        if (!deletedVehicle) {
            return res.status(404).json({
                error: "Vehicle not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle data deleted successfully.",
            data: deletedVehicle
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
 * @route   POST /DeliveryUser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/DeliveryUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await DeliveryUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new DeliveryUser({
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
router.post('/Deliverylogin', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await DeliveryUser.findOne({ username });
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
  router.get('/Delivery-data', (req, res) => {
    // For simplicity, we're not implementing authentication here
    res.json({ data: 'Here is your Delivery data!' });
  });


module.exports=router;