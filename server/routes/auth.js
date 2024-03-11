import express from "express";
import { signup } from '../controllers/signup.js'
import { signin } from "../controllers/signin.js";
const router = express.Router();

//Routes for auth api
router.post("/signup",signup);
router.post("/signin",signin);
export default router;