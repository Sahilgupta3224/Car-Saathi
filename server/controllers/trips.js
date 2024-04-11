import tripSchema from "../models/trip.js";
import User from "../models/user.js";

export const createtrip =async(req,res)=>{
    const {source,destination,driver,availableSeats,CarModel,Riders,Max_Seats,completed,time,route,fare} = req.body;
    const trip = tripSchema(req.body);
    console.log(req.body)
    try{
        await trip.save()
        const user = await User.findByIdAndUpdate(
            driver,
            { $push: { trips:trip } },
            { new: true }
        );
        
        res.status(200).json({trip})

    }catch(err){
        res.status(500).json({message:'Server error by kritarth'})
        console.log(err);
    }
    console.log(trip)
}

export const findtrip = async(req,res)=>{
    const {source,destination,time} = req.body.tripData;
    try{
        const trip = await tripSchema.find({source:source,destination:destination});
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

export const deleteTrip = async(req,res)=>{
    try{
        const trip = await tripSchema.findByIdAndDelete(req.params.id);
        const driver = trip.driver;
        const updatedDriver = await User.findByIdAndUpdate(
            driver,
            {$pull:{trips:req.params.id}},
            {new: true}
        );

        // Iterate through each booking associated with the trip
        for (const bookingId of trip.Bookings) {
            const booking = await BookingSchema.findById(bookingId);
            if (booking) {
                // Removing the trip from each booker's bookings array
                const updatedUser = await User.findByIdAndUpdate(
                    booking.userId,
                    {$pull:{bookings:bookingId}},
                    {new: true}
                );
            }
        }
        res.json({message:"trip deleted"});
    } catch(err){
        console.error(err);
        res.status(500).json({message:"cannot delete the trip/trip not found"});
    }
}


//jinhone trip ki request ki h unke waha se hatani padegi trip
        //mai is trip ke andar jaunga aur dekhunga ki kin logo ne iske
        //liye request ki thi ya fir unke requested trips me jaake is 
        //trip ko hatana padega
        //iske liye mai har ek trip me push krunga ki kis user ne request
        //ki h aur kaun sa user confirmed h fir uske baad unke model me 
        //jaake is trip ko delete krunga
        //payment lautana h
        //notification dena h
        //ho sake to koi aur trip provide karani h