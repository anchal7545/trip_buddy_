import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import Jwt  from "jsonwebtoken";
import crypto from 'crypto'


const user = new mongoose.Schema({
     
   name:{
      type:String,
      required:[true,"Please enter your name"],
      minlength:[3,"Name must be atleast 3 characters"],
      maxlength:[20,"Name atmost 20 characters"]
   } ,
   email:{
     type:String,
     required:[true,"Please enter your email"],
     unique:true,
   },

   password:{
     type:String,
     required:[true,"Please enter your password"],
     minlength:[8,"Password must be atleast 8 characters"],
     select:false
   },

   role:{
     type:[String],
     enum:["user","admin"],
     default:["user"]
   },
   avatar:{
     public_id:String,
     url:String
   },

   createdAt:{
      type:Date,
      default:Date.now 
   },

   resetPasswordExpire:Date,
   resetPasswordToken:String 
   
})

user.pre('save',async function(next){
    if(!this.isModified("password")) return next()
})

user.methods.getJWTToken = function(){
  return Jwt.sign({_id:this._id},process.env.JWT_SECRET_TOKEN,{
     expiresIn:"15d"
  })
}

user.pre('save', async function(next){
  if(!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password,10);
  next()
})



user.methods.comparePassword = async function(password){
 return await bcrypt.compare(password,this.password) ; 
}


user.methods.getResetToken = function(){
 const resettoken =  crypto.randomBytes(20).toString('hex');
 this.resetPasswordToken = crypto.createHash('sha256').update(resettoken).digest('hex')
 this.resetPasswordExpire=Date.now()+15*60*1000;
 return resettoken;
}



export default mongoose.models.User || mongoose.model("User",user)