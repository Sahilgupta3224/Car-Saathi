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
        validate: {
        validator: function(v) {
          return /^([0-9]{10}$)/.test(v);
        }},
        required: true
    }
})

export default mongoose.model("User",userSchema)