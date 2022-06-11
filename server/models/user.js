const mongoose = require("mongoose");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase:true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre("save",async function(next){
    try{
        const generated_salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(this.password,generated_salt);
        this.password = hashed_password
        next();
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.isPasswordValid = async function(password){
    try{
        return await bcrypt.compare(password,this.password);
    }
    catch(err){
        next(err);
    }
}
module.exports = mongoose.model("User",userSchema);