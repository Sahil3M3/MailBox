const User=require("../models/User");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports.addUserToDB=async (req) => {
    
    const {email,password}=req.body;
    const salt=5;
    try {
        const hashPassord=await bcrypt.hash(password,salt);    

        const user=User({email,password:hashPassord});
        await user.save();   

        return {status:201,message:"User is Added"};       

        
    } catch (e) {
        console.log(e);
        
        return { status: 409, error: e.message };
    }
}
//sahil1@gmail.com
module.exports.getUserFromDB=async (req) => {
    const {email,password}=req.body;

    try {
        const user=await User.findOne({email})
        
        if(user){
            const isValid= await bcrypt.compare(password,user.password);
            
            if(isValid)
                {                       
                           return { status: 200, message: "Login successful", token:generateToken(user._id) };
                        }
                   else
                        {
                           return { status: 401, message: "Password is Wrong" };
                        }
            
        }
       else
        return{status:404,message:"User Not Found"};
        
    } catch (e) {
        console.log(e);
        
        return { status: 409, error: e.message };
        
    }
    
}

function generateToken(_id){
    const key = "sahil";
    return jwt.sign({ userId: _id }, key);
}