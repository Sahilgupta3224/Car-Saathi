import express from "express";
import { createtrip,findtrip,edittrip,deleteTrip} from "../controllers/trips.js";
const router = express.Router();

//Routes for booking api
router.post("/createtrip",createtrip);
router.get("/findtrip",findtrip);
router.put("/edittrip",edittrip);
router.delete("/deleteTrip/:id",deleteTrip);

export default router;