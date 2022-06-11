require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

//database connection
mongoose.connect(process.env.MONGO_URI,{
    dbName: process.env.DB_Name
}).then(()=>{
    console.log("Database Connected")
}).catch((err)=>console.log(err))

app.use(morgan());
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/register-route"));
app.use("/api/users", require("./routes/auth-route"));

app.use((req,res,next)=>{
    next(createError.NotFound());
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    return res.send({error:{
        status:error.status||500,
        msg:error.message
    }})
})

const Port = process.env.PORT||4000;
app.listen(Port,()=>console.log("Server is up and running"));


