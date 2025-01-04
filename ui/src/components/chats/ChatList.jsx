import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetMyGroupsQuery } from '../../redux/api/userApi'
import { setChatNavigation, setSearchDialog } from '../../redux/slices/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetGroupQuery } from '../../redux/api/groupApi'

const ChatList = () => {

 
  const {data,isLoading,isError,isSuccess,error} = useGetMyGroupsQuery() 
  const {user,isAuthenticated} = useSelector((state)=> state.auth)
  const [groups, setGroups] = useState([])
  const dispatch = useDispatch()
  const {id} = useParams()
  const navigate = useNavigate()
  const {data:groupData,isLoading:groupLoading,isSuccess:groupSuccess,isError:groupError} = useGetGroupQuery({id})


  const {chatNavigation} = useSelector((state)=>state.ui)

  useEffect(() => {
    if(isSuccess){
      setGroups(data.groups)
    }
    if(!isAuthenticated)
      navigate("/login")

  }, [isLoading,isSuccess,isError,chatNavigation,groupData,isAuthenticated])
   

  const openSearchDialog =()=>{
      dispatch(setSearchDialog(true))
  }
  const navHandler = ()=>{
    dispatch(setChatNavigation(false))
 }


  return (
    <>
      <div className={`bg-[#dacab1] -z-10 md:z-20 ${chatNavigation ? 'z-20':'-z-10'} absolute h-full p-6 flex flex-col space-y-4 overflow-y-auto`}>
            <button onClick={navHandler} className='self-end block md:hidden'>
                <svg width="24px" height="24px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3d2f2f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#453636"></path> </g></svg>
            </button>
            <div className="flex flex-col space-y-3">

                 {groups.length > 0 && groups.map((group)=>(
                       <Link to={`/chats/${group._id}`}>
                          <div className={`${id==group?._id ? 'bg-[#3d2f2f] text-[#f5ebda] border border-[#dacfbd]':'bg-[#f5ebda] text-[#3d2f2f]'} hover:scale-105 duration-300 shadow py-2 px-10 rounded `}>
                             <h6 className='font-medium'>{group.name}</h6>
                             <p className='text-sm font-medium'>Adventure Trip</p>
                             <p className='text-[12px]'>Joined At : 20 12 2023</p>
                           </div>
                       </Link>
                 ))} 
            </div>
           
           {user && groupData &&  <div className="space-y-1">
                  <div className="">
                      <p>{user?.name}</p>
                  </div>
                  <div className="">
                      <p className='text-sm'>{user?.email}</p>
                  </div>
                  <div className="">
                      <p className='text-sm'>Joined At : {new Date(user?.createdAt).toJSON().slice(0, 10)}</p>
                  </div>
                  <div className="">
                      <p className='text-sm'>Travelling Date : {new Date(groupData?.group?.tripId?.endDate).toJSON().slice(0, 10)}</p>
                  </div>
                  <div className="">
                      <p className='text-sm'>Type : {groupData?.group?.tripId?.types}</p>
                  </div>
                  <div className="">
                      <p className='text-sm'>Members : {groupData?.group?.members?.length}</p>
                  </div>
                 
                </div>
               }
            <button onClick={openSearchDialog} className='bg-stone-900 text-stone-300 py-2 rounded text-center space-x-2 flex items-center justify-center'>
               <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#f5ebda"></path> </g></svg>
               <p className="">Members</p>
             </button>
      </div>
        
    </>
  )
}

export default ChatList