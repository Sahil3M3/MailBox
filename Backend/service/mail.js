const Mail=require("../models/Mail");

module.exports.addMailToDB=async (req) => {
   
    const { receiver,subject,message } = req.body;

    try {

      const mail= await Mail({from:req.user.email,subject,to:receiver,message})
         await mail.save();

      return {status:201,message:"Mail is Send"};       

      
  } catch (e) {
      console.log(e);
      
      return { status: 409, error: e.message };
  }
    
}

module.exports.getMailFromDB=async (req) => {

  try {
    const result= await Mail.find({to:req.user.email});
    
    let data=result.map(m=>{
      return {_id,from,subject,message}=m;

    })
    
    return {status:200,data:data}
  } catch (error) {
    return {status:400,error:error}
    
  }
  
  
  
}