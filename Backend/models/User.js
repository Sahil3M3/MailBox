const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
      },
      password:{
        type:String
      }  
})

const User=mongoose.model("User",userSchema);

module.exports=User;
