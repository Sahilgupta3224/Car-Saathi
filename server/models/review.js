import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    Reviewer:{
        type:mongoose.ObjectId,
        required:true,
        trim:true
    },
    ReviewedUser:{
        type:mongoose.ObjectId,
        required:true,
        trim:true
    },
    Rating:{
        type:Number,
        required:true,
        trim:true
    },
    Comment:{
        type:String, 
        unique:true,
        required: true
    },
    Date:{
        type:Date
    }
},{timestamps: true});

export default mongoose.model("Review",reviewSchema)