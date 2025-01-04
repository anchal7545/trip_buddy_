import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js"
import { catchAsyncError } from "./catchAsyncError.js";


// for cookie-token 
export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
     
   const {token} = req.cookies;
      if(!token) return next(new ErrorHandler("Please login to access this resourses",401))
   const decode = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
   req.user = await User.findById(decode._id)
   next();

})
