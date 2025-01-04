import mongoose, { Document, Schema } from "mongoose";


const group = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     members:{
         type:[mongoose.Schema.Types.ObjectId],
         ref:"User"
     },
     tripId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trip"
     },

     createdAt:{
        type:Date,
        default:Date.now 
     }
})



export default mongoose.models.Group || mongoose.model("Group",group)
