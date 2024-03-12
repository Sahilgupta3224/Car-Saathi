import trip from "../models/trip.js";
import tripSchema from "../models/trip.js";

export const createtrip =async(req,res)=>{
    const {source,destination,driver,availableSeats,CarModel,Riders,Max_Seats,completed,time,route,fare} = req.body;
    const trip = tripSchema(req.body);
    try{
        await trip.save()
        res.status(200).json({trip})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(trip)
}

export const findtrip = async(req,res)=>{
    const {source,destination,time} = req.body;
    try{
        const trip = await tripSchema.find({source:source,destination:destination,time:time});
        res.status(200).json({trip});
    }
    catch{
        res.json({message:"No such trips found"})
    }
}

export const edittrip = async(req,res)=>{
    try{
        const trip = await tripSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({message:"trip edited"})
    }catch(err){
        res.json({message:"cannot edit the trip/trip not found"})
    }
}

export const deletetrip = async(req,res)=>{
    try{
        const trip = await tripSchema.findByIdAndDelete(req.params.id);
        res.json({message:"trip deleted"})
        //payment lautana h
        //notification dena h
        //ho sake to koi aur trip provide karani h
    }catch(err){
        res.json({message:"cannot delete the trip/trip not found"})

    }
}