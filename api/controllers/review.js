import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Trip from "../models/trip.js"
import ErrorHandler from "../utils/errorHandler.js";
import {Review} from "../models/review.js"


export const newReview = catchAsyncError(async (req, res, next) => {
   const {comment,rating,tripId} = req.body 

   if(!comment || !rating || !tripId)
    return next(new ErrorHandler("All Fields are required",404))

   const  trip = await Trip.findById(tripId) 
   if(!trip) {
     return next(new ErrorHandler("Trip not found",404))
   }

   const isExist = trip.members.find((member)=>member.toString()===req.user._id.toString())
   if(isExist){
     const review = Review.create({comment,rating,tripId,user:req.user})
     return res.status(200).json({
      success: true,
      review
    });
   } 
   
   res.status(200).json({
    success: true,
    message: "You Cannot review this trip",
   });

});



export const getReview = catchAsyncError(async (req, res, next) => { 
  const reviews = await Review.find({tripId:req.params.id}).populate('user','name avatar') 
  res.status(200).json({
    success: true,
    reviews
   });

});



export const deleteReview = catchAsyncError(async (req, res, next) => {
  const  review = await Review.findById({_id:req.params.id}) 
  if(!review) {
    return next(new ErrorHandler("Review not found",404))
  }

  const isExist = review.user.toString()===req.user._id.toString()
  if(!isExist){
    return res.status(400).json({
     success: true,
     message:"You cannot deleted this review"
   });
  } 
  await review.deleteOne()
  res.status(200).json({
   success: true,
   message: "Review Deleted",
  });

});



  