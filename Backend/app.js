const express=require("express");
const mongoose=require("mongoose");

const userRoutes=require("./routes/user")
const app=express();
app.use(express.json());

app.use("/",userRoutes);


mongoose.connect("mongodb+srv://sahil3m3:manager@cluster0.l9lq9.mongodb.net/mailbox?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{

    app.listen("5000",()=>{
        console.log("Database is connected and listing on 5000");   
    })

}).catch((e)=>{
    console.log(e);
    
})