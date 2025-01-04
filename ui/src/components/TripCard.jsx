import React, { useEffect } from 'react'
import { useSendRequestMutation } from '../redux/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const TripCard = ({trip}) => {

  const [sendRequest,{isLoading,error,data,isSuccess,isError}] = useSendRequestMutation()
  const  {user} = useSelector((state)=>state.auth)
  // already joined member not need to join --> handle 
  const joinHandler =() =>{
     sendRequest({owner:trip?.admin,groupId:trip?.groupId})
  } 

  useEffect(() => {
    let toastId;
    if(isLoading)
       toastId=toast.loading("Request is sending")
    if(error){
        toast.error(error?.data?.error,{id:toastId})
    }
    if(isSuccess)
       toast.success(data?.message,{id:toastId}) 
    
  }, [isSuccess,isError])
  

  return (
    <Link to={`/trip-view/${trip?._id}`} className='w-full group hover:shadow border rounded hover:scale-105 duration-500 h-fit bg-stone-50'>
           
             <div className="relative ">
                 <img src="/images/img5.jpg" alt="" className='rounded-t' />
                 <div className="absolute space-y-1 p-2 bg-[#fafafaaa] opacity-0 group-hover:opacity-100 duration-500 left-0 right-0 mx-auto bottom-0">
                     <div className="flex items-center justify-between ">
                        <p className='text-sm text-stone-700'>{trip?.name}</p>
                        <Link to="/" className='bg-stone-900 text-sm mx-auto  text-white shadow hover:scale-105 duration-500 inline-block rounded-full px-6 py-[4px]'>Join</Link>
                     </div>
                    
                     <p className='text-xs font-medium text-stone-700'> Travelling Date : {new Date(trip?.endDate).toJSON().slice(0, 10)}</p>
                    
                 </div>
             </div>

            <div className="p-2">
                  <p className='text-sm mb-1 text-gray-500'>{trip?.description}</p>
                  <div className="flex -space-x-4 -ml-1 overflow-hidden mr-1">
                      {trip?.members.map((member)=>(
                         <div className="overflow-ellipsis">
                            {member?.avatar?.url ? <img src={member?.avatar?.url} /> :  <svg fill="#d1d1d1" className='' width="44px" height="44px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#d1d1d1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></g></svg> }
                         </div>  
                      ))}                     
                                    
                  </div>
                  <p className='text-base font-light text-stone-600'>{trip?.types}</p>
                  <p className='text-sm  text-stone-600'>Roorkee Haridwar Uttarakhand</p>
            </div>
   
    </Link>
  )
}

export default TripCard