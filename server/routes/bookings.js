import express from "express";
import { booktrip,cancelbooking,confirmbooking } from "../controllers/booking.js";
const router = express.Router();

//Routes for booking api
router.post("/booktrip",booktrip);
router.delete("/cancelbooking",cancelbooking);
router.post("/confirmbooking",confirmbooking);

export default router;