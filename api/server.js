import express from "express";
const app = express() 
import {config} from 'dotenv'
import {createServer} from "http"
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
const server = createServer(app)
import { connectDb } from "./utils/database.js";
export const userSocketIDs = new Map();
import userRoute from "./routes/user.js"
import tripRoute from "./routes/trip.js"
import review from "./routes/review.js"
import { ErrorMiddleware } from "./middleware/Error.js";
import cors from "cors"
import { socketAuth } from "./middleware/socketAuth.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./utils/constants.js";
import Message from "./models/message.js"
import { getSockets } from "./utils/util.js";
import cloudinary from "cloudinary" 



config({
   path:"./config/config.env"
})

cloudinary.config({
   cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
   api_key:process.env.CLOUDINARY_CLIENT_KEY,
   api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
})


const corsOption = {
    origin:[
       "http://localhost:5173",
       "http://localhost:4173"
    ],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}
connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(
   cors(corsOption)
 );

const io = new Server(server,{cors:corsOption})

app.use("/api",userRoute)
app.use("/api",tripRoute)
app.use("/api",review)
app.set("io",io)



// .on listeners -------- emit like click event 
io.use((socket, next) => {
   cookieParser()(socket.request, socket.request.res, async(err) => await socketAuth(err,socket,next));
 });



io.on("connection",(socket)=>{
    //console.log("user connectd ",socket.id)
    //console.log(socket.user)
    const user = socket.user 
    userSocketIDs.set(user._id.toString(), socket.id);
    console.log(userSocketIDs) 
    socket.on(NEW_MESSAGE,async({id,members,message})=>{
        // emit this message to all members 
           const newMessage = await Message.create({
              content:message,
              owner:user._id,
              groupId:id
          })

        const socketMember = getSockets(members) 
        io.to(socketMember).emit(NEW_MESSAGE,{id,newMessage})  
        io.to(socketMember).emit(NEW_MESSAGE_ALERT,{id})          

    })


    socket.on("disconnect",()=>{
       userSocketIDs.delete(user._id.toString()) 
    })

})

app.use(ErrorMiddleware)

server.listen(4000,()=>{
     console.log("listing...........")
})
