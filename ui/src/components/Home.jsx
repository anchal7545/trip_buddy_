import { useDispatch } from "react-redux"
import Header from "./Header"
import HeaderSection from "./HeaderSection"
import SubHeader from "./SubHeader"
import SearchBar from "./SearchBar"
import MostVisitedPlace from "./mostvisited/MostVisitedPlace"
import MostActiveGroup from "./MostActiveGroup"
import Footer from "./Footer"
import { useGetProfileQuery } from "../redux/api/tripApi"
import { useEffect } from "react"
import { setIsAuthenticated, setUser } from "../redux/slices/userSlice"




const HomePage = () => {

    
  const dispatch = useDispatch()
  const {data,isLoading,isError,isSuccess} = useGetProfileQuery()

   useEffect(() => {
    if(isSuccess){
        dispatch(setUser(data.user))
        dispatch(setIsAuthenticated(true))
     }
     
 }, [isSuccess,isError,isLoading])
   

  return (
    <>
      <div className='relative text-white h-[50vh] sm:h-[60vh] md:h-[calc(100vh)] mx-auto'>
          <Header/>
          <HeaderSection/> 
          {/* <h1>Enjoy Your dream places around the world</h1> */}
          {/* find the perfect place to go  */}
          {/*  */}
      </div>
       <SubHeader/> 
       <SearchBar/>

      {/* most visited places  */}
      {/* <h1 className='capitalize mt-28 text-xl font-normal ml-12'>most visited places </h1> */}
      <div className="min-h-screen  w-full bottom-20 top-16 relative pt-8
       ">
           <h1 className='capitalize text-xl font-normal ml-12 my-6'>most visited destination </h1>
           <MostVisitedPlace/>
      </div>

      {/* currently active groups */}
      <div className="min-h-screen w-full text-xl mt-40 pt-12">
            <MostActiveGroup/>  
      </div>



      <Footer/>

    </>
  )
}

export default HomePage

///  #263033