/** @format */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const {isAuthenticated} = useSelector((state)=>state.auth)
  
  const toggleMenu=()=>{
       setMenuOpen(!menuOpen) 
  }

  function logScrollHeight() {
    const scrollTop = window.scrollY; 
    setHeight(scrollTop)
 }

  useEffect(() => {
      window.addEventListener('scroll', logScrollHeight);
      console.log(isAuthenticated)
  }, [height,isAuthenticated])
  
 // #DACAB1
  return (
    <header
      className={`h-20 flex z-30 shadow ${height >= 80 ? 'sm:fixed sm:top-0 sm:left-0 w-full sm:text-stone-800 header_animation':'text-stone-400'} items-center text-sm md:text-base justify-between pl-4 md:pl-8`}
    >
      <Link
        to="/"
        className="space-y-1 mr-5 whitespace-nowrap text-xs sm:text-sm flex flex-col items-center justify-center"
      >
        <svg
          fill={`${height >= 80 ? '#46403f':'#9b948a'}`}
          height="30px"
          width="30px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 222 256"
          xml="preserve"
          transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <ellipse
              transform="matrix(0.337 -0.9415 0.9415 0.337 -113.0684 327.4005)"
              cx="175.9"
              cy="244"
              rx="9.8"
              ry="9.8"
            ></ellipse>{" "}
            <g>
              {" "}
              <path d="M70.7,44.2c11.5-0.9,20.1-11,19.2-22.4c-1-11.5-11-20.1-22.5-19.2c-11.5,1-20.1,10.9-19.2,22.5 C49.2,36.5,59.2,45.1,70.7,44.2z"></path>{" "}
              <path d="M217.4,218.9l-27-65.9c-1.1-2.6-3-4.6-5.5-5.4c-1.8-0.6-3.6-0.6-5.3,0.1l-30.7,12.6c-0.1,0-0.1,0.1-0.2,0.1l-9.4-23 c4.6-0.9,8-5.1,7.6-10c-0.1-0.4-0.1-0.8-0.2-1.2l-13.5-34.8c-0.5-1.8-1.5-3.4-2.9-4.5L88.4,52.8c-4.1-2.9-9.2-4.8-14.6-4.4 c-7.2,0.6-13.1,5-16.7,10.5l-21.1,41.8L7.3,120.4c-2.4,1.9-3.9,5-3.7,8.2c0.4,5.2,5,9.1,10.2,8.7c1.5-0.1,2.8-0.7,4.3-1.4 l31.3-21.6c1-0.8,1.8-1.7,2.3-2.8l7.9-15.6l9.4,41.7l-37,43.7c-0.8,1.4-1.4,2.9-1.7,4.5l-10,52.9c0.1,1.2-0.1,1.9-0.1,2.9 c0.6,7.8,7.4,13.6,15.2,12.9c6.4-0.5,11.2-5.3,12.7-11.2l9.5-49.5l30.1-33l7,32.1c0.2,1.5,2.2,4.7,2.8,6l28.9,48.7 c2.9,4.5,7.7,7.3,13.2,6.9c7.8-0.6,13.6-7.4,13-15.2c-0.2-2.2-1.1-4.5-1.9-6.1l-26.9-45.1L101.6,89l14.6,11.8l10.2,24.7l1.8,4.5 c0.2,0.8,0.5,1.6,1,2.4l39.3,97c3.9-2,8.5-2.4,12.9-0.8c5,1.8,8.6,5.8,10.1,10.6l22-9C217.5,228.6,219.3,223.5,217.4,218.9z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
       
        <p className={ `border-t-[1px] text-xs ${height >= 80 ? 'border-[#8d8b8a]':'border-[#e4d6bf]'}`}>Let's Travel Together</p>
      </Link>

      {/* right */}
      <div className="flex w-[80%] lg:w-[70%] items-center space-x-4 justify-between">
        {/* menu  */}
        <div className={`${isAuthenticated ? "visible" : "invisible"}`}>
          <div className=" hidden sm:flex space-x-10  lg:space-x-16 whitespace-nowrap ">
            <Link to="/" className={`${height >=80 ? 'hover:text-black':''} group w-fit hover:scale-105 duration-500 flex flex-col items-center justify-center`}>
               Home
              <div className="h-[1px] duration-500 w-full bg-stone-400 opacity-0 group-hover:opacity-100"></div>
            </Link>
            <Link to="/trips" className={`${height >=80 ? 'hover:text-black':''} group w-fit hover:scale-105 duration-500 flex flex-col items-center justify-center`}>All Trips
              <div className="h-[1px] duration-500 w-full bg-stone-400 opacity-0 group-hover:opacity-100"></div>
            </Link>
            <Link to="/new_trip" className={`${height >=80 ? 'hover:text-black':''} group w-fit hover:scale-105 duration-500 flex flex-col items-center justify-center`}>New Trip
              <div className="h-[1px] duration-500 w-full bg-stone-400 opacity-0 group-hover:opacity-100"></div>
            </Link>
            <Link to="/chats" className={`${height >=80 ? 'hover:text-black':''} group w-fit hover:scale-105 duration-500 flex flex-col items-center justify-center`}>Groups
              <div className="h-[1px] duration-500 w-full bg-stone-400 opacity-0 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>

       { isAuthenticated ? <>
           
             <p className="block text-white pr-8 sm:hidden cursor-pointer" onClick={toggleMenu}>
                 <svg fill={`${height >= 80 ? '#292524':'#e4d6bf'}`}  width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1920 1468.412v112.94H0v-112.94h1920Zm0-564.706v112.941H0V903.706h1920ZM1920 339v112.941H0V339h1920Z" fill-rule="evenodd"></path> </g></svg>
             </p>
             <Link to="/profile" className="hidden text-white pr-8 sm:block hover:animate-pulse cursor-pointer">
                 <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill={`${height >= 80 ? '#46403f':'#9b948a'}`}></path> </g></svg>
             </Link>
        
         </> :  <Link
             to="/login"
             className={`${height >= 80 ? 'bg-[#292524] text-[#e4d6bf]': 'bg-[#e4d6bf] text-stone-700'} rounded-s-full text-base 2xl:text-lg pr-4 sm:pr-6 flex items-center space-x-3 sm:space-x-2`}
        >
              <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill={`${height >= 80 ? '#9b948a':'#46403f'}`}></path> </g></svg>
          <p>Login</p>
        </Link>
      }
      </div>

       
       {/* mobile menu  */}
      {  menuOpen && <div className="sm:hidden absolute left-0 right-0 top-0 bg-white text-black flex flex-col space-y-1 items-center justify-center">
              <p className="self-end p-2 cursor-pointer" onClick={toggleMenu}>
                 <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </p>
               <div className="flex flex-col space-y-6 items-center justify-center">
                    <a href="">Home</a>
                    <a href="">All Trips</a>
                    <a href="">How it work</a>
                    <a href="" className="pb-8">Search</a>
               </div>
              
       </div>}

    </header>


  );
};

export default Header;
