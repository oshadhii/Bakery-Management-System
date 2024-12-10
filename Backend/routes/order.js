const express = require('express');
const app = express();
const router = express.Router();
const Order = require('../models/Order');
const Cors = require('cors');

app.use(Cors());

router.post('/Supplierorder/save', async (req, res) =>{
    try{
        const {orderTable} = req.body;
        const newPost = new Order({
            orderTable
        })
        await newPost.save();
        return res.status(200).json({
            success: true,
            orderTable : newPost
        });
    } catch(err){
        return res.status(400).json({
            error: err.message,
        });

    }
});

// read data

router.get("/Supplierorder/read",async(req, res)=>{
    try{
        const posts=await Order.find().exec();
        return res.status(200).json({
            success:true,
            order:posts

        });
    }catch(err){
        return res.status(400).json({
         error:err.message   
      });
    }

});

// delete

router.delete("/Supplierorder/delete/:id",async(req, res)=>{
    try{

        const deletePost = await Order.findByIdAndDelete(req.params.id).exec();

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

module.exports = router;
