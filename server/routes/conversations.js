import express from "express";
import { newConversation,getConversation } from '../controllers/conversation.js'
const router = express.Router();

//Routes for auth api
router.post("/",newConversation);
router.get("/:userId",getConversation);

export default router;