const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Cors = require('cors');
const Inquiry = require('../models/CustomerInquiry');

app.use(Cors());

router.post('/inquiry/save', async (req, res) =>{
    try{
        const {inquiryTable} = req.body;
        const newPost = new Inquiry({
            inquiryTable
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data added successfully",
            inquiryTable : newPost
        });
    } catch(err){
        return res.status(400).json({
            error: err.message,
        });

    }
});

// read data

router.get("/inquiry/read",async(req, res)=>{
    try{
        const posts=await Inquiry.find().exec();
        return res.status(200).json({
            success:true,
            inquiry:posts

        });
    }catch(err){
        return res.status(400).json({
         error:err.message   
      });
    }

});

// update

router.put("/inquiry/update/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log("Update request received for ID:", req.params.id);
    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await Inquiry.findOneAndUpdate(
            { _id: objectId },
            { 'inquiryTable.status':status },
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

//delete
router.delete("/inquiry/delete/:id",async(req, res)=>{
    try{

        const deleteOrder = await Inquiry.findByIdAndDelete(req.params.id).exec();

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

module.exports = router;