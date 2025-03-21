const User=require("../models/User");
const bcrypt=require("bcrypt")

module.exports.addUserToDB=async (req) => {
    
    const {email,password}=req.body;
    const salt=5;
    try {
        const hashPassord=bcrypt.hash(password,salt);

        const user=User({email,hashPassord});
        await user.save();   

        return {status:201,message:"User is Added"};       

        
    } catch (e) {
        console.log(e);
        
        return { status: 409, error: e.message };
    }
}