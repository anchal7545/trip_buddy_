import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ChatList from './ChatList';
import { SocketContext } from '../../SocketProvider';
import { NEW_MESSAGE } from '../../constants';
import { useGetGroupChatsQuery, useGetGroupQuery } from '../../redux/api/groupApi';
import Messages from './Messages';
import { useGetAllNotificationQuery } from '../../redux/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setChatNavigation, setNotificationDialog } from '../../redux/slices/uiSlice';
import NotificationDialog from './NotificationDialog';


const Chat = () => {

 
  const {id} = useParams()// groupId 
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState("")
  const [members, setMembers] = useState([])
  const [notifications, setNotifications] = useState(0)
  const {user,isAuthentication} = useSelector((state)=> state.auth)
  const [newMessage, setNewMessage] = useState([])
  const {data,isLoading,isSuccess,isError} = useGetGroupQuery({id}) 
  const {data:chatData,isLoading:chatLoading,isSuccess:chatSuccess,isError:chatError} = useGetGroupChatsQuery({id,skip:!id})
  const {data:notification,isSuccess:notificationSuccess} = useGetAllNotificationQuery()

  const submitHandler =(e)=>{
      e.preventDefault()
      if(!message.trim()) return 
      socket.emit(NEW_MESSAGE,{id,members,message})
      setMessage("")
  }


  const newMessageHandler = useCallback((data)=>{
    setNewMessage(prev =>[...prev,data])
  },[])

  
 const clickHandler =()=>{
     dispatch(setNotificationDialog(true))
 }

  useEffect(() => {
    console.log(user)
    setNotifications(notification?.allRequests?.length)
      // socket.on("connect", () => {
      //    console.log(socket.connected); // true
      // });
      
      socket.on(NEW_MESSAGE, newMessageHandler) 
      if(isSuccess)
          setMembers(data?.group?.members)
      return ()=>{
          socket.off(NEW_MESSAGE,newMessageHandler);
          setNewMessage([])
      }

   }, [id,notificationSuccess])


   const {chatNavigation} = useSelector((state)=> state.ui) 
   const navHandler = ()=>{
      dispatch(setChatNavigation(true))
   }
 


  return (
    <>

      <div className="flex h-screen">
                 <ChatList/>
                 <div className="absolute z-10 w-full bg-[url('/images/chat01.jpg')] bg-no-repeat bg-cover bg-center h-[100vh] flex-1">
                 <div className="absolute pl-0 md:pl-64 top-0 w-full h-full">
                          <nav className='w-full shadow z-30 sticky space-x-8 px-6 py-2 flex items-center justify-between text-white'>
                                <div className="flex space-x-6 mt-3 items-center w-full overflow-x-auto">
                                     {data && data?.group?.members && data?.group?.members?.map((member)=>(
                                           <div className=""> 
                                               {member?._id===data?.group?.admin ? <p className='text-xs my-1 bg-[#f5ebda] text-stone-700 font-semibold rounded-full px-1 text-center'>Admin</p> : <p className='font-semibold rounded-full px-1 text-center my-1 text-xs opacity-0'>user</p>}
                                               {member?.avatar ? <img src={member?.avatar?.url} className='w-8 h-8 object-contain rounded-full border' /> : <svg width="34px" className='border rounded-full' height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#dacab1"></path> </g></svg> }
                                               <p className='text-[#f5ebda] text-sm'>{member?.name}</p>
                                          </div> 
                                      ))}
                                </div>

                                <div className="flex space-x-4 pr-6">
                                     <Link to={`/profile`}> {user?.avatar ? <img src={user?.avatar?.url} className=' w-10 h-8 border rounded-full object-contain' /> : <svg width="34px" className='border rounded-full' height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#dacab1"></path> </g></svg>}</Link>
                                     <div className="relative cursor-pointer" onClick={clickHandler}>
                                        <svg className='absolute' width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dacab1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#dacab1"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#dacab1"></path> </g></svg>
                                        <p className='absolute w-4 text-sm text-center h-4 bg-red-600 text-white rounded-full flex items-center justify-center'>{notifications}</p>
                                    </div>
                                    <button onClick={navHandler} className='block pl-8 md:hidden'>
                                        <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dacab1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.32H22" stroke="#dacab1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 18.32H22" stroke="#dacab1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6.32001H22" stroke="#dacab1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </button>
                                </div>
                          </nav>

                           { isLoading? <h1>Loading....</h1> : (
                                  <Messages id={id} newMessage={newMessage} chatData={chatData} />
                           )}
                 </div>
                 <form onSubmit={submitHandler} className="absolute  bottom-4 w-[90%] rounded-full flex items-center shadow bg-[#dacab1]">
                     <input type="text" name='message' value={message} onChange={e=>setMessage(e.target.value)} className='flex-1 px-6 py-3 text-base text-stone-800 focus:outline-none bg-[#dacab1] placeholder:text-stone-500' placeholder='text here...' />
                     <button type="submit" className='cursor-pointer px-6 rotate-12'><svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1C1917"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14" stroke="#1C1917" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                </form>
              </div>
      </div>
    
      <NotificationDialog/>
        
    </>
  )
}

export default Chat