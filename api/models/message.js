import mongoose, { Document, Schema } from "mongoose";

const message = new mongoose.Schema({
     content:{
         type:String
     },
     groupId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Group",
         required:true
     },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     attachments:[
        {
            public_id:{
               type:String,
               required:true
            },
            url:{
              type:String,
              required:true
            }
         }
      ],
     createdAt:{
        type:Date,
        default:Date.now 
     }
})



export default mongoose.models.Message || mongoose.model("Message",message)