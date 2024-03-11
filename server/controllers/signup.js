
import User from  "../models/user.js"
import bcrypt from "bcryptjs";

export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const mobno = bcrypt.hashSync(req.body.phone,salt);

    // Check if the email is already in use
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(400).json({ success: false, message: "Email is already in use." });
    }

    // Check if the phone no. is already in use
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: "Phone number is already in use." });
    }

    const newUser = new User({ ...req.body, password: hash,phone: mobno });

    await newUser.save();
    res.status(200).json({ newUser });

  } catch (err) {
    next(err);
    console.log(err);
  }
};