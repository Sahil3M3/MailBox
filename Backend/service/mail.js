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