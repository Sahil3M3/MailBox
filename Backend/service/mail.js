const Mail=require("../models/Mail");
const mongoose =require("mongoose")

module.exports.addMailToDB=async (req) => {
   
    const { receiver,subject,message } = req.body;

    try {

      const mail= await Mail({from:req.user.email,subject,to:receiver,message,read:false})
         await mail.save();

      return {status:201,message:"Mail is Send"};       

      
  } catch (e) {
      console.log(e);
      
      return { status: 409, error: e.message };
  }
    
}

module.exports.getMailsFromDB=async (req) => {

  try {
    const result= await Mail.find({to:req.user.email});
    
    let data=result.map(m=>{
      return {_id,from,subject,message,read}=m;
    })
    
    return {status:200,data:data}
  } catch (error) {
    return {status:400,error:error}
    
  }
  
}

module.exports.getSentMailFromDB=async (req) => {
  
  try {
    const result= await Mail.find({from:req.user.email});
    
    let data=result.map(m=>{
      return {_id,to,subject,message}=m;

    })
    
    return {status:200,data:data}
  } catch (error) {
    return {status:400,error:error}
    
  }
  
}
module.exports.getMailFromDB=async (req) => {

  const {id}=req.params
 const DB_id= new mongoose.Types.ObjectId(id);
 
 const {isSentTrue}=req.body;
 try {
   
   const result= await Mail.findById(DB_id);       
   let data=({_id,to,from,subject,message,read}=result);
   
   if(isSentTrue){
    result.read=true;
    result.save();
   }
       console.log(result);
       
    return {status:200,data:data}
  } catch (error) {
    console.log(error);
    
    return {status:400,error:error}
    
  }
  
}