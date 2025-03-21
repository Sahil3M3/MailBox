const userService=require("../service/user")

module.exports.addUser=async (rej,res,next) => {
    
    const result=await userService.addUserToDB(rej)
    return res.status(result.status).json({ message: result.message, token: result.token, error: result.error });

    
}