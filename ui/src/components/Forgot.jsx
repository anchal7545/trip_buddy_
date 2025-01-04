import React, { useEffect, useState } from 'react'
import { useForgotMutation } from '../redux/api/authApi'
import toast from 'react-hot-toast'

const Forgot = () => {

  const [email, setEmail] = useState("")
  const [forgot,{isLoading,isError,error, data,isSuccess}] = useForgotMutation() 
  

  const submitHandler =(e)=>{
       e.preventDefault() 
       forgot({email})
  }

  useEffect(() => {
   if(isError){
      toast.error(error?.data?.error)
   }
   if(isSuccess){
      toast.success(data?.message)
   }
    
  }, [isSuccess,isError])
  

  return (
      <div className="flex bg-gray-50 items-center min-h-screen justify-center">

           <form onSubmit={submitHandler} className='rounded w-1/2 flex items-center flex-col justify-center'>
                <div className="flex flex-col m-6 space-y-3">
                     <label htmlFor="" className='text-gray-600 text-center'>Enter Email</label>
                     <input type="email" value={email} onChange={e=> setEmail(e.target.value)} className='focus:outline-none text-center border px-6 rounded py-1' placeholder='abc@gmail.com' />
                </div>
                 <button className='px-4 py-1 mb-6 bg-black text-white rounded hover:scale-105 duration-500 hover:bg-gray-900'>Send</button>
           </form>

      </div>
  )
}

export default Forgot