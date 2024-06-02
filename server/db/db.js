import mongoose from "mongoose"

//Function to connect to database
export const connect =()=>{
    // console.log(process.env.MONGO)
    mongoose.connect("mongodb+srv://sahil:sahil@cluster0.pnuom1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Database Connected...")
    })
    .catch((err)=>{
        
        throw err;
    })
}