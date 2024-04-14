import express from "express";
import { signup,verifyMail, forgetPassword, resetPassword } from '../controllers/signup.js'
import { signin } from "../controllers/signin.js";
const router = express.Router();

//Routes for auth api
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/verify",verifyMail);
router.post('/forget-Password', forgetPassword)
router.get('/reset-password/:token', resetPassword)

export default router;