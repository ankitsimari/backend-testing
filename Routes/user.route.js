
const express = require('express');
const { userModel } = require('../Model/user.model');
const userRouter =express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BlackList } = require('../Model/Blacklist.model');

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body
    try{
        let already = await userModel.findOne({email});
        if(already){
            res.status(200).send({"user_Already_registered":already})
        }else{
            // bcrypt.hash(password, 5, async(err, hash)=> {
                // if(err){
                //     res.status(200).send("passwordNotHashed")
                // }else{
                    const user = new userModel({name,email,password});
                    await user.save();
                    res.status(200).send({"userAdded":user})
                // }
            // });
        }

    }
    catch(e){
        res.status(400).send({"err":e.message})
    }
})

userRouter.get("/",async(req,res)=>{
    try{
        let users = await userModel.find();
        res.status(200).send(users)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


    userRouter.post("/login", async(req,res)=>{
        const {email,password} = req.body
        try{
            let user = await userModel.findOne({email});
            if(user){
                // bcrypt.compare(password, user.password, async(err, result)=> {
                    // result == true
                    if(user.password==password){
                        var token = jwt.sign({ email: email }, 'Ankit',{expiresIn:'2h'});
                        res.status(200).send({"login_successful":user,token})
                    }else{
                        res.status(200).send("wrong_Password")
                    }
                // });
            }else{
                res.status(200).send("wrong_Email")
            }
        }
        catch(e){
            res.status(400).send({"err":e.message})
        }
    })




    userRouter.get("/logout",async(req,res)=>{
        const token = req.headers.authorization?.split(" ")[1]
        try{
            let newBlack = new BlackList({token});
            await newBlack.save();
            res.status(200).send("logoutSuccessful")
        }
        catch(e){
            res.status(400).send({"err":e.message})
        }
    })







module.exports={userRouter}