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
    trips:{
        type:Array,
        default:[]
    },
    active_trp:{
        type: mongoose.ObjectId
    },
    role:{
        type:Boolean
    },
},{timestamps: true});

export default mongoose.model("User",userSchema)