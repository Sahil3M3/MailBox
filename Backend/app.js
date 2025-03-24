const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")

const mailRoutes=require("./routes/mail");
const userRoutes=require("./routes/user")
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
require('dotenv').config();
app.use("/",userRoutes);
app.use("/mail",mailRoutes);


mongoose.connect(process.env.DB_KEY)
.then(()=>{
    app.listen(5000,()=>{
        console.log("Database is connected and listing on 5000");   
    })


}).catch((e)=>{
    console.log(e);
    
})