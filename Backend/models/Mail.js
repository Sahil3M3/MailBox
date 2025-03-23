const mongoose=require("mongoose");

const mailSchema=mongoose.Schema({
    from:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
      },
    to:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
      },
      subject:{
        type:String,
        trim :true,
      },
      message:{
        type:String,
        trim :true,
        required:true,
      }
})

const Mail=mongoose.model("Mail",mailSchema);

module.exports=Mail;