import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteTripMutation, useGetMyTripAsMemberQuery, useGetMyTripQuery } from '../redux/api/tripApi'
import toast from 'react-hot-toast'
import { useUploadAvatarMutation } from '../redux/api/userApi'

const Profile = () => {

  const {user,isAuthenticated} = useSelector((state)=>state.auth) 
  const {data,isLoading,isSuccess,isError,error} = useGetMyTripQuery()
  const {data:asMemberData,isLoading:asMemberLoading,isSuccess:asMemberSuccess,isError:asMemberError} = useGetMyTripAsMemberQuery()
  const navigate = useNavigate()
  const [deleteTrip ,{data:deleteData, isLoading:deleteLoading,isSuccess:deleteSuccess,isError:deleteError}] = useDeleteTripMutation()

  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("")

  const [uploadAvatar,{isLoading:avatarLoading, data:avatarData, isSuccess:avatarSuccess , error:avatarError}] = useUploadAvatarMutation()


  useEffect(() => {
    
    if(!isAuthenticated)
       navigate("/login")
    if(isError){
       toast.error(error?.data?.error)
    }
    if(deleteSuccess)
      toast.success(deleteData?.message)

    if(user && user?.avatar?.url){
         const avatarImage = avatarPreview ? avatarPreview : user?.avatar?.url
         setAvatarPreview(avatarImage)
    }
      console.log(avatarData)
  }, [user,isAuthenticated,data,isSuccess, avatarData, asMemberData,deleteSuccess,avatarSuccess])
  
  const deleteHandler =(id)=>{
      deleteTrip({id})
  }

  const avatarHandler = (e)=>{
     e.preventDefault()
     const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
   reader.readAsDataURL(e.target.files[0]);
  }


  const submitHandler =(e)=>{
      e.preventDefault()
      uploadAvatar({avatar}) 
  }

  return (
    <>
     <div className="text-black">
         <Header/>
     </div>
     <div className='flex-col'>
         <div className="p-8 space-y-8 bg-[#faf6f0] mx-auto rounded w-full flex flex-col items-center justify-center">

               <form
                  onSubmit={submitHandler} 
                  className="flex relative p-1 items-center justify-center w-28 h-28 rounded-full border-dashed border border-stone-500 cursor-pointer"
                >
                <input
                  type="file"
                  name="avatar" accept='image/*'
                  onChange={avatarHandler}
                  className="opacity-0 z-20 absolute w-full h-full cursor-pointer"
                /> 
                   {avatarPreview ? <img src={avatarPreview} className='w-full h-full rounded-full' /> :
                     <svg fill="#cabca6" height="128px" width="128px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#b0b0b0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M256,478.609 c-64.688,0-122.835-27.902-163.544-72.103c20.663-40.627,55.519-71.647,97.116-87.857c-30.438-21.118-50.442-56.267-50.442-96.04 c0-64.445,52.424-116.87,116.87-116.87s116.87,52.424,116.87,116.87c0,39.764-19.995,74.904-50.421,96.023 c41.624,16.195,76.505,47.183,97.189,87.771C378.923,450.664,320.737,478.609,256,478.609z"></path> </g> </g> </g></svg>}
                  { avatarPreview && avatar &&  <button type='submit' disabled={avatarLoading} className='absolute bottom-0 -right-20 border rounded text-sm px-2 hover:scale-105 duration-500 py-[2px]'>Change</button> }
              </form>
            

                 <div className="space-y-6">
                 <div className="flex">
                     <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#cabca6"></path> </g></svg>
                     <p className='ml-3'>{user?.name}</p>
                 </div>
                 <div className="flex">
                     <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml="preserve" fill="#cabca6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path  d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"></path> </g> </g></svg>
                     <p className='ml-3'>{user?.email}</p>
                 </div>
                 <div className="flex">
                     <svg fill="#cabca6" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" stroke="#cabca6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,19c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-8H2V19z M19,4h-2V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H9V3c0-0.6-0.4-1-1-1S7,2.4,7,3v1H5C3.3,4,2,5.3,2,7v2h20V7C22,5.3,20.7,4,19,4z"></path></g></svg>
                     <p className='ml-3'>{user?.createdAt}</p>
                 </div>

              </div>


              <div className="flex">
                   <button className='px-6 rounded mr-4 py-[6px] bg-stone-800 text-[#cabca6] font-medium text-sm'>Update</button>
                   <button className='px-6 rounded ml-4 py-[6px] bg-stone-800 text-[#cabca6] font-medium text-sm'>Update Password</button>
              </div>
         </div>
         
     </div>
     <h1 className='mt-32 text-center'>My Trip</h1>
     <div className="flex flex-col pl-8 w-full bg-white flex-1">
          <div className="bg-white mt-12 flex flex-col m-6 flex-wrap items-center justify-center sm:flex-row">
                
               {
                    data && data?.trips?.map((trip)=>(
                         <div className="bg-[#DACAB1] mb-3 text-sm max-w-md p-4 m-4 rounded shadow space-y-1">
                         <p><span className='text-sm font-medium'>{trip?.name} </span></p>
                         <p>Travelling Date : <span className='text-sm font-medium'>{trip?.endDate}</span></p> 
                         <p>Location : <span className='text-sm font-medium'>Pauri Gharwal</span></p>
                         <p className='min-w-md'>Description <span className='text-sm font-medium'>{trip?.description}</span> </p>
                         <div className="">Members : {trip?.members?.length}</div>
                         <div className="space-x-4 pt-4">
                              <Link to={`/update_trip/${trip._id}`} className='px-4 py-1 text-sm border-2 border-stone-700 rounded hover:scale-105 duration-500 font-medium'>Update</Link>
                              <button onClick={()=>deleteHandler(trip?._id)} className='px-4 py-1 text-sm border-2 border-stone-800 rounded bg-stone-800 text-[#d4c197] hover:scale-105 duration-500 font-medium'>Delete</button>
                              <Link to={`/chats/${trip?.groupId}`} className='underline'>Let's Chat</Link>
                         </div>
                         </div>
                    ))
               }
          </div>
          <h1 className='my-4 mt-12 text-center'>Joined as a Member</h1>
          <div className="bg-white mb-64 flex flex-col items-center justify-center m-6 flex-wrap sm:flex-row">
                
                {
                    asMemberData && asMemberData?.trips?.map((trip)=>(
                         <div className="bg-[#DACAB1] mb-3 text-sm max-w-md p-4 m-4 rounded shadow space-y-1">
                         <p><span className='text-sm font-medium'>{trip?.name} </span></p>
                         <p>Travelling Date : <span className='text-sm font-medium'>{trip?.endDate}</span></p> 
                         <p>Location : <span className='text-sm font-medium'>Pauri Gharwal</span></p>
                         <p className='min-w-md'>Description <span className='text-sm font-medium'>{trip?.description}</span> </p>
                         <div className="">Members : {trip?.members?.length}</div>
                         <Link to={`/chats/${trip?.groupId}`} className=' inline-block pt-3 underline'>Let's Chat</Link>
                         </div>
                         
                    ))
               }
          </div>
            
      </div>

      <Footer/>
    </>
  )
}

export default Profile