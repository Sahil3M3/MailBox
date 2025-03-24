const mailService=require("../service/mail")

module.exports.addMail=async (req,res,next) => {
    
    const result=await mailService.addMailToDB(req);
    return res.status(result.status).json({ message: result.message, error: result.error });    

    
}
module.exports.getMail=async (req,res,next) => {
    
    const result=await mailService.getMailFromDB(req);
    return res.status(result.status).json({ data: result.data, error: result.error });    
    
}