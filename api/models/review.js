import mongoose, { Schema ,Types,model } from "mongoose";

const schema = new Schema({
      
 comment:{
     type:String,
     required:true
 } ,
 
 rating:{
     type:Number
 },

 user:{
    type:Types.ObjectId,
    ref:'User',
    required:true
 },

 tripId:{
    type:Types.ObjectId,
    ref:'Trip',
    required:true
 }

        
},{timestamps:true})


export const Review = mongoose.models.Review || model("Review",schema)