import React from 'react'
import Chat from './Chat'
import { Link } from 'react-router-dom'
import ChatList from './ChatList'
import { useDispatch, useSelector } from 'react-redux'
import { setChatNavigation } from '../../redux/slices/uiSlice'

const Chats = () => {

  const dispatch = useDispatch() 
  const {chatNavigation} = useSelector((state)=> state.ui) 
   
  const navHandler = ()=>{
     dispatch(setChatNavigation(true))
  }

  return (
      <div className="flex h-screen relative">
             <ChatList/>
             <div className="absolute w-full z-10 bg-[#f8f3ea] h-full flex-1 flex flex-col items-center mx-auto">
                 <button onClick={navHandler} className='self-end  p-4 block md:hidden'>
                    <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#523d3d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.32H22" stroke="#614848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 18.32H22" stroke="#614848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6.32001H22" stroke="#614848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                 </button>
                 <div className="my-auto">
                    <h1 className='text-center text-2xl text-stone-800 '>Let 's start Chat </h1>
                    <p className='text-center'>by selecting a group</p>
                 </div>
             </div>
     </div>
  )
}

export default Chats