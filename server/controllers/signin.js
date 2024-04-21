import User from  "../models/user.js"
import bcrypt from "bcryptjs";

export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.status(500).json({message:"Email not Found"});
      else{
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {res.status(500).json({ message: "Incorrect password" });}
        else{
          const { password, ...others } = user._doc;
        res
        .status(200)
        .json(others)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };