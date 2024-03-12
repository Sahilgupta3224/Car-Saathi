import bookingSchema from "../models/booking.js";

import User from "../models/user.js";

export const booktrip =async(req,res)=>{
    const {Driver}=req.body.Driver
    const {Bookingperson}=req.body.Bookingperson
    const booking= bookingSchema(req.body);
    try{
        await booking.save()
        const user = await User.findByIdAndUpdate(
            Bookingperson,
            {$push:{requestedbookings:booking._id}},
            {new: true}
        );
        const driver = await User.findByIdAndUpdate(
            Driver,
            {$push:{requestedtrips:booking._id}},
            {new: true}
        );
        res.status(200).json({booking})
    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(trip)
}

export const cancelbooking = async(req,res)=>{
    const {source,destination,time} = req.body;
    try{
        const booking = await bookingSchema.findByIdAndDelete(req.params.id);
        const Driver = booking.Driver;
        const bookinguser = booking.bookinguser;
        const user = await User.findByIdAndUpdate(
            bookinguser,
            {$pull:{bookings:req.params.id,requestedbooking:req.params.id}},
            {new: true}
        );
        const driver = await User.findByIdAndUpdate(
            Driver,
            {$pull:{requestedtrips:req.params.id,trips:req.params.id}},
            {new: true}
        );
        res.status(200).json({ message: "Booking canceled", booking, user: updatedUser, driver: updatedDriver });
        //payment lautana h
    }
    catch{
        res.json({message:"No such bookings found"})
    }
}

export const confirmbooking = async(req,res)=>{
    try{
        const trip = await tripSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({message:"booking confirmed"})
    }catch(err){
        res.json({message:"cannot delete the trip/trip not found"})

    }
}   