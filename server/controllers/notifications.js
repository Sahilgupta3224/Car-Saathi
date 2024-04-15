import bookingSchema from "../models/booking.js";
import NotificationSchema from "../models/notifications.js";

export const bookingnotification =async(req,res)=>{
    const userId = req.body.userId;
    const type="booking";
    console.log(req.body.userId);
    console.log("oyeoye",userId)
    try{
      const today = new Date().toISOString().slice(0, 10);
      console.log("user",userId)
      const bookings = await bookingSchema.find({ Bookingperson: userId });
      // console.log("bookings",bookings)
      const todayBookings = bookings.filter((booking) => {
        const dateObj = new Date(booking.Date);
        return dateObj.toISOString().slice(0, 10) === today;
      });
      console.log("mannu",todayBookings)
        for (const booking of todayBookings) {
            const content = `${booking.source} to ${booking.destination} on ${booking.Date}`;
            const existingNotification = await NotificationSchema.findOne({ userId, type, content });
            if (!existingNotification) {
              console.log("roo");
                const newNotification = new NotificationSchema({
                  userId,
                  type,
                  content,
                });
                await newNotification.save();
                return res.status(200).json("success");
              }
              else{
                console.log("utyt");
                return res.status(200).json("already present")
              }
            }
    }catch(err){
        res.status(500).json({message:'Server error by kritarth'})
        console.log(err);
    }
}

export const getnotifications =async(req,res)=>{
  try{
    const id = req.params.id;
    const notifications = await NotificationSchema.find({ userId: id });
    console.log(notifications)
    res.status(200).json({notifications})
  }
  catch(e){
    console.log(e);
    res.status(500).json("erro in retrieving notifications");
  }
}