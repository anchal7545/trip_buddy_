import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAcceptRequestMutation, useGetAllNotificationQuery } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { setNotificationDialog } from '../../redux/slices/uiSlice'



const NotificationDialog = () => {
 
   const {notificationDialog} = useSelector((state)=>state.ui)
   const {data:notification,isSuccess:notificationSuccess} = useGetAllNotificationQuery()
   const [acceptRequest,{isLoading,isError,isSuccess,error}]  = useAcceptRequestMutation()
   const dialogRef = useRef(null);
   const dispatch = useDispatch()

   const requestHandler =(request,id) =>{
      acceptRequest({accept:request,requestId:id})
   }

   

   if (notificationDialog && dialogRef.current && !dialogRef.current.open) {
     dialogRef.current.showModal();
   }

   const handleClose = () => {
     if (dialogRef.current) {
       dialogRef.current.close();
       dispatch(setNotificationDialog(true))
     }
     onClose();
   };

   useEffect(() => {

     if(isSuccess)
         toast.success("Request accepted")
     if(isError)
         toast.error(error?.data?.error)
        
   }, [notificationDialog,notificationSuccess,isSuccess])
   

  return (
       <>  
          {
             notification?.allRequests?.length > 0 && 
          
             <dialog ref={dialogRef} className='flex flex-col items-center justify-center rounded'>
                    {notification && notification?.allRequests?.map((item)=>(
                          <div className='p-4 border-b'>
                               {/* <p><span>{item._id.serder?.name} want to join GROUP_NAME group</span></p> */}
                               <p className='font-thin text-base p-2 text-center'><span className='font-semibold'> Anchal </span> want to join GROUP_NAME group</p>
                               <div className="flex items-center justify-center space-x-6">
                                  <button className='bg-[#372A2A] text-[#C4B59F] p-2 py-1 text-sm font-bold rounded' onClick={(e)=>requestHandler(true,item._id._id)}>Accept</button>
                                  <button className='text-[#372A2A] border border-[#372A2A] p-2 py-1 text-sm font-bold rounded' onClick={(e)=>requestHandler(false,item._id._id)}>Reject</button>
                               </div>
                          </div>
                   ))}
                    <button className='my-6 bg-[#372A2A] text-[#C4B59F] px-8 py-1 text-sm rounded' onClick={handleClose}>Close</button>
            </dialog>
        }  
       </>
  )
}

export default NotificationDialog