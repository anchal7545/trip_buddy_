import React, { useEffect } from 'react'
import ActiveGroupCard from './groups/ActiveGroupCard'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useGetMostActiveQuery } from '../redux/api/tripApi';
import toast from "react-hot-toast"


const MostActiveGroup = () => {


  const {data,isLoading,isError,isSuccess,error}  = useGetMostActiveQuery()

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4// optional, default to 1.
    },
    desktop1: {
      breakpoint: { max: 1024, min: 900 },
      items: 3,
      slidesToSlide: 3// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 900, min: 564 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  useEffect(() => {
    console.log(data)
     if(isError)
       toast.error(error?.data?.error)
  }, [isError,isSuccess])
  

  return (
    <div className='flex flex-col z-0 items-center justify-center my-24 sm:my-0'>
         <h1 className='w-[100%] pl-12 sm:pl-16'>Most Active Groups</h1>
         {  data && data?.trips  && data?.trips?.length > 0 && <div className="mt-4 w-full mx-auto px-12">
           <Carousel 
              
               swipeable={true} 
               responsive={responsive} 
               infinite={true}
               autoPlay={true}   
               autoPlaySpeed={3000}
              
              >
                   
                {data && data?.trips ? data?.trips.map((trip)=>{
                     return ( <ActiveGroupCard trip={trip} /> );
                }) : <></>}

          </Carousel>  
         </div>}
    </div>
  )
}

export default MostActiveGroup