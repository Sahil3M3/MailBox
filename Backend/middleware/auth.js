const jwt=require("jsonwebtoken");
const User=require("../models/User")

const authenticate=async (req,res,next) => {
    const token=req.headers.authorization;

    if(!token){
        res.status(403).json({message:"No token provided"})
    }
    else{

        const key="sahil";
        const {userId:_id}=jwt.verify(token,key);       
        User.findById(_id)
        .then(r=>{
            if(!r)
            {
                return res.status(500).json({ msg: 'Failed to authenticate token' });
            }
            else
            return r;
        })
        .then(u=>{
          
            req.user=u;
            next();
        })
        .catch(e=>console.log(e))
    }

    
}

module.exports=authenticate;
