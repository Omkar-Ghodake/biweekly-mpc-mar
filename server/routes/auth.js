const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;







// this code is for sending otp through email for resetting password
// api require email : reciever's email id , subject: which is to be sent and a html : to send html as a string

router.post('/sendOtp',async (req,res)=>{

    const {username,email}=req.body;

    let success=false;

    const raw_otp = Math.floor(100000 + Math.random() * 900000).toString();

    let encrypted_otp="";

    // encrypting the otp 
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(raw_otp, salt, function(err, hash) {
            // use this hash variable to store the tp value in the database 
        });
    });


    // creating message 
    const msg={
        from:"testbot.1831@gmail.com",
        to:req.body.email,
        subject:"Reset Password",
        html:`
        <div>
        <h3>Hello ${username},<br>Your otp to reset password is :</h3>

        <div style="display: flex; justify-content: center;">
            <h1 fontSize:2vw; style="background-color:white; display: inline; color:rgb(0, 132, 209);">${raw_otp}</h1>
        </div>

        <h3>Thanks and Regards,<br>Team MPC</h3>
        </div>
    `,
       
};


router.post('/verifyOtp',async (req,res)=>{
    const {domain_name,userOtp}=req.body;

    let userEnteredOtp= "";

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(userOtp, salt, function(err, hash) {
            
            // compare this hash to the stored encrypted otp and generate the response accordingly 
        });
    });




})


// this code is for establishing the connection between gmail and node  
nodemailer.createTransport({
    service:"gmail",
    auth:{
        // add the sender credentials 
        user:"testbot.1831@gmail.com",
        pass:"trlxmuclinxflaku"
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
