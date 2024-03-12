import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:String, 
        unique:true,
        required: true
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number
    },
    reviews:{
        type:[Object] //review id,rating,comment,written by whom
    },
    trips:{
        type:Array,
        default:[]
    },
    bookings:{
        type:Array,
        default:[]
    },
    requestedbookings:{
        type:Array,
        default:[],
    },
    requestedtrips:{
        type:Array,
        default:[],
    },
    active_trp:{
        type: mongoose.ObjectId
    },
    active_booking:{
        type: mongoose.ObjectId
    },
    role:{
        type:Boolean
    },
},{timestamps: true});

export default mongoose.model("User",userSchema)