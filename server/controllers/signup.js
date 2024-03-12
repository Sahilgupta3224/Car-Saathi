import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const ErrorMessage = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

//For sending mail
const sendVerifyMail = async(name,email,user_id)=>{
  try{
     nodemailer.createTransport({
      service:"gmail",//add gmail service 
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth : {
    user: EMAIL,
    pass: PASSWORD,//App password   
  },
     });
     const mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'CarSaathi Email verification',
      html:'<p>Hi' + name + ', please click here to <a href="http://localhost:3000/verify?id='+user_id+'">Verify</a> your email.</p>'
     }

    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);
      }else{
        console.log("Email has been sent:- ",info.response)
      }
    })

  }catch(err){
    console.log(err.message);
  }

}

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const mobno = req.body.phone;  
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use." });
    }
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is already in use." });
    }

    const newUser = new User({ ...req.body, password: hash, phone: mobno });

    const userData = await newUser.save();
    if(userData){
      sendVerifyMail(req.body.username,req.body.email,userData._id);
      res.status(200).json({ newUser });
    }

  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const verifyMail = async(req,res)=>{
  try{

   const updatedInfo = await User.updateOne({_id:req.query.id},{ $set:{ email_verified: true } }) 

   console.log(updatedInfo);
   res.status(200).json({message:"email successfully verified"});

  }catch(error){
    console.log("error is",error.message);
  }
}
