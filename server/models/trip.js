import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    source:{
        type: Object,
        required: true,
    },
    destination:{
        type: Object,
        required: true,
    },
    driver:{
        type: mongoose.ObjectId,
        require: true,
    },
    availableSeats:{
        type: Boolean,
        default: true
    },
    Carmodel:{
        type:String,
        required:true
    },
    Max_Seats:{
        type: Number,
        required: true,
    },
    Riders:{
        type: Array,
        default: []
    },
    completed:{
        type:Boolean,
        default:false
    },
    time:{
        type: Date,
        required: true,
    },
    route:{
        type: Array
    },
    fare:{
        type:Number,
        required:true
    }
},{timestamps: true});

export default mongoose.model("Trip",tripSchema)