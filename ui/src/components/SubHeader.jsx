import React from 'react'

const SubHeader = () => {

  
  return (
    <>
        
        <div className="w-full px-12 mt-16 sm:mt-8 text-stone-900 grid gap-8 sm:gap-16 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
               
               <div className="w-full text-animation cursor-default bg-[#dacab1] p-3 md:p-4 hover:scale-105 duration-500 rounded shadow-md">
                   <h1 className='font-bold text-base py-1'>Search buddy or Create New Group </h1>
                   <p className='font-[400] text-stone-800 text-sm md:text-base'>Find travel companions or create a new group to invite your friends for a trip. <br /> Set up a group chat for easy communication. Agree on meeting points and times for exploring separately. </p>
               </div>

               <div className="w-full self-center bg-[#dacab1] md:self-end p-3 md:p-5 cursor-default hover:scale-105 duration-500 rounded shadow-md">
                   <h1 className='font-bold text-base py-1'>Plan for Travelling</h1>
                   <p className='font-[400] text-stone-800 text-sm md:text-base'>Discuss Interests and Preferences <br /> Agree on an overall budget for the trip <br />Allow flexibility for spontaneous adventures</p>
               </div>

               <div className="w-full self-center bg-[#dacab1] md:self-end p-3 md:p-5 cursor-default hover:scale-105 duration-500 rounded shadow-md">
                   <h1 className='font-bold text-base py-1'>Enjoy The Travel</h1>
                   <p className='font-[400] text-stone-800 text-sm md:text-base'>Enjoy the destination and share the story</p>
               </div>

        </div>
    
    </>
  )
}

export default SubHeader