const mailService=require("../service/mail")

module.exports.addMail=async (req,res,next) => {
    
    const result=await mailService.addMailToDB(req);
    return res.status(result.status).json({ message: result.message, error: result.error });    

    
}
module.exports.getMails=async (req,res,next) => {
    
    const result=await mailService.getMailsFromDB(req);
    return res.status(result.status).json({ data: result.data, error: result.error });    
    
}
module.exports.getSentMail=async (req,res,next) => {
    
    const result=await mailService.getSentMailFromDB(req);
    return res.status(result.status).json({ data: result.data, error: result.error });    
    
}
module.exports.getMail=async (req,res,next) => {
    
    const result=await mailService.getMailFromDB(req);
    return res.status(result.status).json({ data: result.data, error: result.error });    
    
}
module.exports.deleteMail=async (req,res,next) => {
    
    const result=await mailService.deleteMailFromDB(req);
    return res.status(result.status).json({ message: result.message, error: result.error });    
    
}