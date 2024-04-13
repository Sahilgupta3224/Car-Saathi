import mongoose from "mongoose"

//Function to connect to database
export const connect =()=>{
    mongoose.connect("mongodb+srv://sahil:sahil@cluster0.pnuom1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Database connected...")
    })
    
    .catch((err)=>{

        throw err;
    })
}