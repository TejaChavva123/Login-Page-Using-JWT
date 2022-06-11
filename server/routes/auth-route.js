const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const user = require("../models/user");
const {loginvalidateSchema} = require("../helpers/validateSchema");
const bcrypt = require("bcrypt");
const { generateAccesToken } = require("../helpers/jwtAuth");

router.post("/authentication", async (req,res,next)=>{
    try{
        //validation of entered data
        const result = await loginvalidateSchema.validateAsync(req.body);
        const {email} = result;
        //checking user exists or not
        const user_exists = await user.findOne({email:result.email})
        if (!user_exists){
            res.status(401).send({msg: `User with ${email} not registered`});
        }

        //checking password
        const isMatch = await user_exists.isPasswordValid(result.password);
        if (!isMatch){
            res.status(401).send({ msg: "Invalid Email or Password" });
        }
        const{access_err, access_token }= await generateAccesToken(user_exists._id);
        if (access_err){
            res.status(500).send({ msg: "Internal Server Error" });
        }
        return res.status(200).send({access_token:access_token,msg:"LoggedIn Successfully"});
    }
    catch(err){
        if (err.isJoi == true){
            err.status = 422
        }
        next(err);
    }
})


module.exports = router;

