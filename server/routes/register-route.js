const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const user = require("../models/user");
const {validateSchema} = require("../helpers/validateSchema");
const { generateAccesToken } = require("../helpers/jwtAuth");

router.post("/register", async (req,res,next)=>{
    try{
        //validation
        await validateSchema.validateAsync(req.body)
        
        //getting details
        const {firstName,lastName,email,password} = req.body;

        //if user already registered with these details
        const user_exists = await user.findOne({email:email})
        if (user_exists){
            throw createError.Conflict(`User with ${email} already presents`);
        }

        //saving in the database
        const new_user = new user({firstName,lastName,email,password});
        const saved_user = await new_user.save();

        //generating token
        const{access_err, access_token }= await generateAccesToken(saved_user._id);
        if (access_err){
            throw createError.InternalServerError();
        }
        res.status(201).send({access_token:access_token});
    }
    catch(err){
        if (err.isJoi===true){
            err.status = 422
        }
        next(err);
    }

})

module.exports = router;