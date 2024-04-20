import User from  "../models/user.js"

export const addReview = async(req,res)=>{
    console.log("review",req.body)
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $push: { reviews: req.body } }, //id generated by uuid from frontend
            { new: true }
        );
        let userrev = user.reviews
        res.json({message:"Review added",userrev})
    }catch(err){
        res.json({message:"Review could not be added"})
        console.log(err)
    }
}

export const getReviews = async(req,res)=>{
    const userId= req.params.id;
    console.log("user id is:",req.params.id)
    try{
        const {reviews} = await User.findById(userId)
        res.json({reviews})
    }catch(err){
        res.json({message:"No reviews found"})
    }

}

export const getRating = async(req,res)=>{
    const userId= req.params.id;
    console.log("user id is:",req.params.id)
    try{
        const {reviews} = await User.findById(userId)
        let sum =0 
        let i=0
        for(i;i<reviews.length;i++){
            sum+=reviews[i].Rating
        }
        let rating = 1.0*sum/reviews.length
        res.json({rating})
    }catch(err){
        console.log(err)
        res.json({message:"No rating found"})
    }

}

export const editReview = async(req,res)=>{
    try{
        if(req.body.editedReview.rating==null){
            res.json({message:"Please add a rating"})
        }else{
        const user = await User.findById(req.params.id);
        console.log(user)
        if(!user)res.json({message:"User not found"})
        else{
            user.reviews = user.reviews.map(rev=>{
                if(rev._id==req.body.editedReview._id){
                    rev=req.body.editedReview;
                }
                return rev;
            })
            console.log(user.reviews)
            const usr=await User.findByIdAndUpdate(req.params.id,{$set:{reviews:user.reviews}},{new:true})
            res.json({message:"Review edited",usr})
        }
    }
       
    }catch(err){
        res.json({message:"cannot edit the review"})
        console.log(err)
    }
}

export const deleteReview = async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);

        if(!user)res.json({message:"User not found"})
        
        else{
            const updatedReviews = user.reviews.filter(review=> review._id.toString() !== req.params.reviewId)
            const usr = await User.findByIdAndUpdate(req.params.userId,{$set:{reviews:updatedReviews}},{new:true});
    
            res.json({message:"review deleted",usr})
        }
        
       
    }catch(err){
        res.json({message:"cannot delete the review"})
        console.log(err)
        
    }
}