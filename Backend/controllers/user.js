const userService=require("../service/user")

module.exports.addUser=async (rej,res,next) => {
    
    const result=await userService.addUserToDB(rej)
    return res.status(result.status).json({ message: result.message, token: result.token, error: result.error });    
}

module.exports.getUser=async (req,res,next) => {
    const result=await userService.getUserFromDB(req);
    return res.status(result.status).json({ message: result.message, token: result.token, error: result.error });    
    
    
}