import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    Bookingperson:{
        type: mongoose.ObjectId,
        required:true
    },
    Driver:{
        type: mongoose.ObjectId,
        required:true
    },
    source:{
        type: String,
        required:true
    },
    destination:{
        type: String,
        required:true
    },
    trip:{
        type: mongoose.ObjectId,
        required:true
    },
    NoofBookedSeats:{
        type: Number,
        required:true
    },
    Date:{
        type: Date,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    PaymentMethod:{
        type:String,
        required:true
    },
    rt:{
        type: Number,
    },
    Payment_id:{
        type:String,
    },
    Payment_order_id:{
        type:String,
    },
    Payment_signature:{
        type:String,
    },
    Remark:{
        type:String,
    }
},{timestamps: true});

export default mongoose.model("Booking", bookingSchema);