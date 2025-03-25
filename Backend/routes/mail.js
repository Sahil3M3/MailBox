const express=require("express");

const auth=require("../middleware/auth")
const router=express.Router();
const mailController=require("../controllers/mail")

router.post("/add",auth,mailController.addMail);
router.get("/get",auth,mailController.getMails);
router.get("/get/sent",auth,mailController.getSentMail);
router.put("/messages/:id",auth,mailController.getMail);


module.exports=router;
