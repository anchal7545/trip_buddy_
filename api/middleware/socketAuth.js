import jwt from "jsonwebtoken"
import User from "../models/User.js"
import ErrorHandler from "../utils/errorHandler.js";


export const socketAuth= async(err,socket,next)=>{
      try {
        if(err){
            return next(err)
        }
        const authToken = socket.request.cookies['token']
        if(!authToken)
            return next(new ErrorHandler("Please Login ",401))

        const decodedData = jwt.verify(authToken,process.env.JWT_SECRET_TOKEN)
        const user = await User.findById(decodedData._id) 
        if(!user){
             return next(new ErrorHandler("user not found",404))
        }
  
        socket.user = user 
        return next()

      } catch (error) {
          return next(new ErrorHandler(error,401))
      }


}