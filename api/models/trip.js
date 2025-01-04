import mongoose, {} from "mongoose";

const trip = new mongoose.Schema({
     name:{
         type:String,
         required:[true,"Please provide name"]
     },
     description:{
        type:String,
        required:true
     },

     admin:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     },

     required_buddy:{
         type:Boolean,
         default:false 
     },
     startDate:{
         type:Date,
         default:Date.now
     },
     endDate:{
         type:Date
     },

     groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
     },

    types:{
        type:String,
        enum:["Vaction Trip","Adventure Trip","Mountain Trip","Family Trip"],
        default:"Vaction Trip"
    },
    members:[mongoose.Schema.Types.ObjectId],
    active:{
        type:Boolean,
        default:true
    },
    images:[
        {
           user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User",
           },
           public_id:String,
           url:String
        }
    ],
    location:{
        coordinate:[Number]
    }
})




export default mongoose.models.Trip || mongoose.model("Trip",trip)
