const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");







// this code is for sending otp through email for resetting password
// api require email : reciever's email id , subject: which is to be sent and a html : to send html as a string

router.post('/sendOtp',async (req,res)=>{

    let success=false;



    // creating message 
    const msg={
        from:"helpdsahelper@gmail.com",
        to:req.body.email,
        subject:req.body.subject,
        html:req.body.htmlText,
       
};

nodemailer.createTransport({
    service:"gmail",
    auth:{
        // add the sender credentials 
        user:"@gmail.com",
        pass:"16 digit"
    },
    port:465,
    host:'smtp.gmail.com'
})
.sendMail(msg,(err)=>{
    if(err){
        return res.json({success,error:err});
    }else{
        success=true;
        return res.json({success,message:"Email Sent"});
    }
})


})

module.exports = router
