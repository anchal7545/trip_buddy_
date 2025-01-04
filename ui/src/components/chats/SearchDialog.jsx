import React, { useEffect, useState } from 'react'
import { useLazySearchUserQuery } from '../../redux/api/userApi'

const SearchDialog = () => {
  
 const [name, setName] = useState("")
 const [searchUser] = useLazySearchUserQuery()
  
 useEffect(() => {
   // debouncing 
   const timeOutId = setTimeout(()=>{
         // we need to specify the group in which we want to add member 
           searchUser(name).then(({data})=> console.log(data))
          .catch((e)=>console.log(error))
   },1000) 
 
   return () => {
      clearTimeout(timeOutId)
   }
 }, [name])
 

  return (
     <dialog open>
            <p>Search User</p>
            <div className="">
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Search...' />
            </div>

     </dialog>
  )
}

export default SearchDialog