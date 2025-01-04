import React from 'react'

const Footer = () => {

 

  return (
    <div className=' w-full p-8 bg-stone-800 flex space-y-10 sm:space-y-0 flex-col sm:flex-row items-center justify-between text-white'>
       <div className="sm:self-start self-center">
            <svg
          fill="#ffffff"
          height="38px"
          width="38px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns="http://www.w3.org/1999/xlink"
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
            <p className='pt-2'>Let's Travel Together</p>
         </div>
         <div className="">
             <ul className='flex flex-col space-y-2'>
                <li className='hover:text-gray-400 cursor-pointer duration-500'>How it work</li>
                <li className='hover:text-gray-400 cursor-pointer duration-500'>Search for buddy</li>
                <li className='hover:text-gray-400 cursor-pointer duration-500'>Create Chat group</li>
                <li className='hover:text-gray-400 cursor-pointer duration-500'>Join group</li>
             </ul>
         </div>
         <div className="self-center sm:self-end w-full sm:w-auto">
             <ul className='flex space-x-6 border-t justify-center pt-2 border-gray-700 w-full'>
                <li className='cursor-pointer'><svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path> </g></svg></li>
                <li className='cursor-pointer'><svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github</title> <rect width="24" height="24" fill="none"></rect> <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path> </g></svg></li>
                <li className='cursor-pointer'><svg fill="#ffffff" height="27px" width="27px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="-143 145 512 512" xml="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z "></path> </g></svg></li>
             </ul>
         </div>
    </div>
  )
}

export default Footer