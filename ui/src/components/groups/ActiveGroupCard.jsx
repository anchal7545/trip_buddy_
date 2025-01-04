import React from 'react'
import { Link } from 'react-router-dom'



const ActiveGroupCard = ({trip}) => {

  return (
     <Link to={`/trip-view/${trip?._id}`} className="rounded shadow inline-block mb-4 w-full sm:w-[90%] lg:w-[90%] mx-auto bg-gradient-to-b from-[#dacab1]">
         <img className='w-full rounded' src={'/images/img3.jpg'} width={200} height={0} alt='visit' />
          <div className="flex flex-col space-y-1 p-4 w-full">
                <p className='text-sm font-light'>{trip?.description}</p>
                <p className='text-base'>Manali, Himachal</p>
                <div className="flex -space-x-5 -ml-1">

                      {trip?.members?.map((member)=>(
                          <svg fill="#d1d1d1" className='' width="44px" height="44px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#d1d1d1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></g></svg>
                      ))}                     
                     
                </div>
                <div className='text-sm flex items-center justify-between'>
                    <p className='font-light'> Travelling Date : <span className='font-medium text-xs'>{new Date(trip?.endDate).toJSON().slice(0, 10)}</span></p>
                    
                </div>
                <div className="w-full py-2 text-center">
                    <Link to="/" className='bg-stone-900 text-base text-white shadow hover:scale-105 duration-500 inline-block rounded-full px-7 py-[4px]'>Join</Link>
                </div>
          </div>

     </Link>
  )
}

export default ActiveGroupCard