const express=require("express");

const auth=require("../middleware/auth")
const router=express.Router();
const mailController=require("../controllers/mail")

router.post("/add",auth,mailController.addMail);


module.exports=router;
