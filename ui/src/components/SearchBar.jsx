import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";

const SearchBar = () => {

  const [keyword, setkeyword] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")

  const navigate = useNavigate();

  const submitHandler=(e)=>{
     e.preventDefault()
     if(startDate && endDate)
        navigate(`/trips?keyword=${keyword}&startDate[gte]=${new Date(startDate).toISOString()}&startDate[lte]=${new Date(endDate).toISOString()}`)
     else 
       navigate(`/trips?keyword=${keyword}`)
  }
   

  return (
    <>
    <h1 className='text-center font-thin text-base sm:text-lg mt-32  capitalize px-4 sm:px-0'>Search for  buddies by entering your desire destination and date</h1> 

    <form onSubmit={submitHandler} className='w-full flex flex-col justify-center items-center' id='searchbar'>
          <div className='w-full space-y-8 sm:space-y-0 my-10 gap-8 flex flex-col md:flex-row px-12 items-center'>
               <div className="w-full lg:w-[50%] bg-[#dacab1] text-stone-900 space-x-2 md:space-x-0 shadow rounded p-4 flex items-center justify-around">
                        <div className="flex flex-col text-xs md:text-base space-y-2">
                           <label htmlFor="">Start Date</label>
                           <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className='px-2 focus:outline-none sm:px-8 py-1 rounded' />
                        </div>
                        <div className="flex flex-col text-xs md:text-base space-y-2">
                           <label htmlFor="">End Date</label>
                           <input type="date"  value={endDate} onChange={(e)=>setEndDate(e.target.value)}   className='px-2 focus:outline-none sm:px-8 py-1 rounded' />
                        </div>
               </div>

               <div className="mx-auto ">
                     
                     <div className="mx-auto z-10 w-fit pl-10 border-t rounded-full bg-stone-900 border-stone-400 group relative ">
                        <input type="text" name='keyword' value={keyword} onChange={(e)=> setkeyword(e.target.value)}  className='px-8 md:px-4 text-sm lg:px-12 text-center focus:outline-none shadow-md py-2 sm:py-3 rounded-full text-stone-700' placeholder='Enter Destination ...' />
                        <svg style={{transform:'translateY(-50%)'}} className='absolute left-2 top-1/2 ' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#c7c0ae" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> 
                     </div>
               </div>
          </div>
          <button type='submit' className={` ${startDate || endDate ? 'block':'hidden'} text-sm rounded-full bg-stone-900 text-white px-6 py-2 hover:scale-105 duration-500 w-fit`}>Search</button>
    </form>

     
  </>
  )
}

export default SearchBar