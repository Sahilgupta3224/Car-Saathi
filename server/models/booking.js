import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.ObjectId,
        required:true
    },
    Driver:{
        type:mongoose.ObjectId,
        required:true,
    },
    source:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    trip:{
        type:mongoose.ObjectId,
        required:true,
    },
    NoofBookedSeats:{
        type:Number,
        required:true,
        trim:true
    },
    BookingStatus:{
        type:Boolean,
        required:true,
        default:false,
    },
    fare:{
        type:Number, 
        unique:true,
        required: true
    },
    PaymentMethod:{
        type:String,
        required:true,
        unique:true
    },
    Date:{
        type:Date,
        required:true,
    }
},{timestamps: true});

export default mongoose.model("Booking",bookingSchema)