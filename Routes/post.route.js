const express = require("express");
const { postModel } = require("../Model/post.model");
const { auth } = require("../Middleware/auth.middleware");
const postRouter = express.Router();

postRouter.use(auth)

postRouter.get("/",async(req,res)=>{
    const {email}=req.body
    try{
        let post = await postModel.find({email});
        res.status(200).send(post)
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

postRouter.post("/add",async(req,res)=>{
    try{
        let post = new postModel(req.body);
        await post.save();
        res.status(200).send({"postAdded":post})
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try{
       await postModel.findByIdAndUpdate({_id:id},req.body);
       res.status(200).send("updated")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
       await postModel.findByIdAndDelete({_id:id});
       res.status(200).send("deleted")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

module.exports={postRouter}