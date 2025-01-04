import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Messages = ({id,newMessage,chatData}) => {

 const [messages, setMessages] = useState([])
 const {user} = useSelector((state)=>state.auth)
 
 useEffect(() => {
   setMessages([chatData?.chatMessage,newMessage])

}, [chatData,newMessage])



  return (
    <div className="chat-section my-8 space-y-4 px-6 h-[80vh] chat-image overflow-y-auto w-full">

                {
                       messages && messages?.length > 0 && <>
                       {messages[0]?.length > 0 && messages[0]?.map((item)=>(
                            <h1 className={`my-2 ${user?._id===item?.owner ? "bg-transparent border border-stone-400":"bg-[#dacab1] text-stone-800"}  relative rounded-t-xl rounded-r-xl w-fit z-30 px-4 py-1 text-stone-300`}>{item?.content}</h1> 
                       ))}
                       {messages[1]?.length > 0 && messages[1]?.map((item)=>(
                             <h1 className={`my-2 ${user?._id===item?.newMessage?.owner ? "bg-transparent border border-stone-400":"bg-[#dacab1] text-stone-900"}  relative rounded-t-xl rounded-r-xl w-fit z-30 px-4 py-1 text-stone-300`}>{item?.newMessage?.content}</h1>   
                       ))}
               </>
             }
                     
                        
   </div>
  )
}

export default Messages