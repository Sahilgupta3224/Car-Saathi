import bookingSchema from "../models/booking.js";

import User from "../models/user.js";

import trip from "../models/trip.js";

export const booktrip =async(req,res)=>{
    const {Driver}=req.body.Driver
    const {Bookingperson}=req.body.Bookingperson
    const {trip} = req.body.trip
    const {riders} = req.body.riders
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
        if(booking.BookingStatus===true){
            const updatedTrip = await trip.findByIdAndUpdate(
                booking.trip,
                {
                    $pull: { 
                        Riders: {
                            name: booking.riders.name,
                            age: booking.riders.age,
                            location: booking.riders.location
                        }
                    }, 
                    $pull: { Bookers: booking.Bookingperson }, 
                    $inc: { availableSeats: booking.seats }
                },
                { new: true }
            );
            const user = await User.findByIdAndUpdate(
                bookinguser,
                {$pull:{bookings:req.params.id}},
                {new: true}
            );
            const driver = await User.findByIdAndUpdate(
                Driver,
                {$pull:{trips:req.params.id}},
                {new: true}
            );
        }
        else{
            const user = await User.findByIdAndUpdate(
                bookinguser,
                {$pull:{requestedbooking:req.params.id}},
                {new: true}
            );
            const driver = await User.findByIdAndUpdate(
                Driver,
                {$pull:{requestedtrips:req.params.id}},
                {new: true}
            );
        }
        res.status(200).json({ message: "Booking canceled", booking, user: updatedUser, driver: updatedDriver });
        //payment lautana h
    }
    catch{
        res.json({message:"No such bookings found"})
    }
}

export const confirmbooking = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await bookingSchema.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const user = await User.findById(booking.Bookingperson);
        const driver = await User.findById(booking.Driver);

        if (!user || !driver) {
            return res.status(404).json({ message: "User or Driver not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            booking.Bookingperson,
            { 
                $pull: { requestedbookings: bookingId }, 
                $push: { bookings: bookingId } 
            },
            { new: true }
        );
        const updatedTrip = await trip.findByIdAndUpdate(
            booking.trip,
            { 
                $pull: { requestedbookings: bookingId }, 
                $push: { 
                    Bookings: bookingId,
                    riders: booking.riders,
                    bookers: booking.UserId
                },
                $dec: { availableSeats: booking.NoofBookedSeats }
            },
            { new: true }
        );
        const updatedDriver = await User.findByIdAndUpdate(
            booking.Driver,
            { 
                $pull: { requestedtrips: bookingId },
            },
            { new: true }
        );
        booking.status = true;
        await booking.save();

        res.json({ message: "Booking confirmed", user: updatedUser, driver: updatedDriver });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error confirming the booking" });
    }
};
