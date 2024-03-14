import express from "express";
import { createtrip,findtrip,edittrip,deleteTrip} from "../controllers/trips";
const router = express.Router();

//Routes for booking api
router.post("/createtrip",createtrip);
router.post("/findtrip",findtrip);
router.get("/edittrip",edittrip);
router.get("/deleteTrip",deleteTrip);

export default router;