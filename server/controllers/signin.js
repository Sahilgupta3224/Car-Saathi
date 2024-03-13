import User from  "../models/user.js"
import bcrypt from "bcryptjs";

export const signin = async (req, res, next) => {

    try {
      console.log(req.body)
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.status(200).json({ message: "User does not exist" });
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) {res.status(200).json({ message: "Password does not match" });}
      
      const { password, ...others } = user._doc;
      res
      .status(200)
      .json(others)
    } catch (err) {
      console.log(err);
    }
  };