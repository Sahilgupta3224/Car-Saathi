import express from "express";
import { booktrip,cancelbooking,confirmbooking } from "../controllers/booking";
const router = express.Router();

//Routes for booking api
router.post("/booktrip",booktrip);
router.post("/cancelbooking",cancelbooking);
router.get("/confirmbooking",confirmbooking);

export default router;