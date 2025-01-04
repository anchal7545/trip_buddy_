import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useParams } from 'react-router-dom'
import { useGetReviewQuery, useGetTripQuery, useNewReviewMutation } from '../../redux/api/tripApi'
import toast from "react-hot-toast"
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";



const VisitedView = () => {

  const {id}  = useParams()
 
  const {data,isLoading,isSuccess,error} = useGetTripQuery({id}) 
  const {data:reviewData,isLoading:reviewLoading,isSuccess:reviewSuccess} = useGetReviewQuery({id})
  const [newReview,{isLoading:createLoading,isSuccess:createSuccess,error:createError}] = useNewReviewMutation()
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)

  const [isMember, setIsMember] = useState(false)
  const {user,isAuthenticated} = useSelector((state)=>state.auth)
  useEffect(() => {
    console.log(reviewData)
    if(isSuccess){
       setIsMember(data?.trip?.members?.find((member)=>member.toString()===user?._id?.toString()))
    }
   if(error){
     toast.error(error?.data?.error)
   }
   if(createError){
    toast.error(createError?.data?.error)
  }

  }, [data,isLoading,error,isMember])
  

  const joinHandler=()=>{
       

  }

  const ratingChanged=(newRating)=>{
      setRating(newRating)
  }

  const submitHandler = (e)=>{
     e.preventDefault()
     if(data && data?.trip) {
        newReview(
             {
             comment,
             rating,
             tripId:data?.trip?._id
            }
        ) 
     }
     return 
  }

  return (
    <>
         <Header/>
         <div className="h-1/2 flex flex-col sm:flex-row rounded max-w-4xl sm:mx-auto mt-24 px-8">
                 <img src="/images/img5.jpg" className='rounded-l w-full sm:w-1/2' width={400} height={200} alt="image"/> 
                 <div className="w-full sm:w-1/2 bg-gray-500 h-72 rounded">
                 <iframe
                  style={{ borderRadius: "3px" }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885915.0148130322!2d78.05748831270452!3d29.846806174175917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909a46fc3c9a581%3A0xc29fdfc7d6010775!2sPauri%20Garhwal%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1721992618656!5m2!1sen!2sin"
                  allowFullScreen=""
                  width={"100%"}
                  height={"100%"}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                 </div>
          </div>

          <div className="mx-auto mt-12 px-8 flex flex-col items-start justify-center max-w-4xl">
            {/* <h4 className='text-center text-stone-800 my-4'><span className='text-black'>Location</span> : {data?.trip?.location}</h4> */}
            <p className=' my-1 capitalize text-gray-400'>{data?.trip?.description}</p>
            <p className=' my-1 text-sm text-gray-500'> Travelling Date : {data?.trip?.endDate}</p>
            <p className=' my-1 text-gray-500'>{data?.trip?.types}</p>
            <p className=' my-1 text-gray-500'>Location : Roorkee,Haridwar Uttarakhand</p>
            <div className="flex mt-2 -space-x-5 ">
                
                 {data && data?.trip && data?.trip?.members?.map((member)=>(
                      <div className="">
                         {member?.avatar?.url ? <img src={member?.avatar?.url} /> :  <svg fill="#d1d1d1" className='' width="44px" height="44px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#d1d1d1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></g></svg> }
                      </div>
                 ))}
            </div>
            { !isMember && <button onClick={joinHandler} className='px-6  py-1 bg-stone-800 text-stone-300 m-12 rounded hover:scale-105 duration-500 mx-12 sm:mx-auto'>Join</button>}
          </div>
       

        {/* reviews  */}

        <div className="h-1/2 px-8 rounded max-w-4xl sm:mx-auto mt-24">
               
               { isAuthenticated && isMember && <form onSubmit={submitHandler} className='my-4 space-y-4'>
                       <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Post  a review' className='focus:outline-none border-b' />
                       <ReactStars
                        count={5}
                        isHalf={true}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                      />
                       { isMember && <button type='submit' className='py-1 rounded text-stone-600 hover:scale-105 duration-500 flex px-4 text-sm border my-12'>
                        <svg width="20px" className='pr-1' height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
                         Reviews
                        </button>}
                </form> }

                <h1 className='border-b my-24 text-stone-700'>Reviews</h1>  
        </div>


         {
            reviewData && reviewData?.reviews?.map((review)=>(
              <div className="h-1/2 px-12 rounded space-y-2 max-w-4xl mb-10 sm:mx-auto mt-8">
              <div className="flex space-x-3 items-center">
               {review?.user?.avatar ? <img src={review?.user?.avatar?.url} className='w-10 h-10 object-contain rounded-full ' /> : <svg fill="#d1d1d1" className='' width="44px" height="44px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#d1d1d1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></g></svg>} 
               <p className='text-xs font-medium text-gray-500'>{review?.user?.name}</p>
              </div>
              
              <p className='text-stone-800'>{review?.comment}</p>
                         <ReactStars
                          count={5}
                          isHalf={true}
                          value={Math.max(0, review?.rating)}
                          size={24}
                          activeColor="#ffd700"
                        />
              </div>
            ))
         }
        <div className="mb-48"></div>
       <Footer/>  
    </>
  )
}

export default VisitedView