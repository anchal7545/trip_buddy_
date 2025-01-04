import { userSocketIDs } from "../server.js";

export const getSockets =(users=[])=>{
    const sockets = users.map((user)=>userSocketIDs.get(user.toString()))
    return sockets ;
 }
 
export const emitEvent = (req,event,owner,data)=>{
    let io = req.app.get("io") 
    const userSocket = getSockets([owner]);
    io.to(userSocket).emit(event,data)   
}

// 4:13