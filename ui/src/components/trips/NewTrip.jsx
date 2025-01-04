/** @format */

import React, { useEffect, useState } from "react";
import { useNewTripMutation } from "../../redux/api/tripApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import Header from "../Header";

const tripType = [
   {
      image:"/images/img1.jpg",
      name:"Vacation Trip"
   },
   {
    image:"/images/adventure.jpg",
    name:"Adventure Trip"
    },
    {
      image:"/images/family.jpg",
      name:"Family Trip"
    },
    {
      image:"/images/mountain.jpeg",
      name:"Mountain Trip"
    },
];


//new Date(booking?.checkInDate).toLocaleString("en-US")

const NewTrip = () => {
  // add images
  const [trip, setTrip] = useState({
    name: "",
    required_buddy: false,
    endDate: "",
    types: "",
    location: "",
    description: "",
    images:[]
  });


  const { isAuthenticated } = useSelector((state) => state.auth);
  const [newTrip, { isLoading, isSuccess, error, isError, data }] = useNewTripMutation();
  const navigate = useNavigate();
  const { name, images, required_buddy, endDate, types, location, description } = trip;
  const [imagePreviews, setImagePreviews] = useState([])
  const [image, setImage] = useState([])

  const changeHandler = (e) => {
     let value;
     if(e.target.type==="checkbox")
        value = e.target.checked 


     else if(e.target.type==="file")  {
          const files = Array.from(e.target.files);
          setImage([]);
          setImagePreviews([]);
      
          files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                  setImagePreviews((old) => [...old, reader.result]);
                  setImage((old) => [...old, reader.result]);
                }
              };
            reader.readAsDataURL(file);
        })   
     }
     else
        value = e.target.value 

     setTrip({ ...trip, [e.target.name]: value });
  };



  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
       ...trip,
       images:image
    }
    newTrip(formData);
  };



  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isError) {
      toast.error(error.data.error);
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/");
    }
    
  }, [isSuccess, isError, isLoading]);

          


  return (
    <>
    <Header/>
    <div className="bg-[#ece9e2] min:h-screen flex flex-col items-center px-6">
      <div className="my-12 font-light text-lg">
        <h1 className="text-center underline underline-offset-8 decoration-gray-200 capitalize">
          Let's Make your Dream vacation happen
        </h1>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col w-fit mt-6 mx-auto items-baseline justify-center"
      >
        <div className="flex-col flex lg:flex-row space-y-6 lg:space-y-0 items-baseline w-full space-x-0 lg:space-x-24">
          <div className="flex flex-col space-y-6">
            <div className="flex space-x-6">
              <p className="text-base text-stone-700 sm:text-lg">Name</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={changeHandler}
                className="px-3 rounded-sm focus:outline-none focus:border-gray-300 py-1"
                placeholder="Our Gharwal Trip"
              />
            </div>
            <div className="flex space-x-6">
              <p className="text-base text-stone-700 sm:text-lg">Required Buddy</p>
              <input
                type="checkbox"
                name="required_buddy"
                value={required_buddy}
                onChange={changeHandler}
                className="cursor-pointer accent-stone-600"
                placeholder="Our Manali Trip"
              />
            </div>
            <div className="flex space-x-6">
              <p className="text-base text-stone-700 sm:text-lg">Travelling Date</p>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={changeHandler}
                className="px-3 rounded-sm focus:outline-none focus:border-gray-300 py-1 placeholder:text-gray-300"
                placeholder={`${Date.now().toLocaleString()}`}
              />
            </div>

            <div className="flex space-x-6">
              <p className="text-base text-stone-700 sm:text-lg">Location</p>
              <input
                type="text"
                name="location"
                value={location}
                onChange={changeHandler}
                className="px-2 rounded-sm focus:outline-none focus:border-gray-300 py-1"
                placeholder="Pauri,Gharwal"
              />
            </div>
            <div className="flex space-x-6 py-8 h-80">
               <iframe
                  className="shadow w-full"
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




          <div className="flex flex-col space-y-12">
            <div className="flex space-x-6 items-center">
              <p className="text-base text-stone-700 sm:text-lg">Description</p>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={changeHandler}
                className="px-4 w-44 sm:w-72 rounded-sm focus:outline-none focus:border-gray-300 py-1"
                placeholder={`Add Your Description`}
              />
            </div>

            <div className="">
              <p className="text-base text-stone-700 sm:text-lg">Type</p>

              <fieldset
                id="group"
                className="flex flex-wrap"
                
              >
                {tripType.map((type) => (
                  <label htmlFor="" className="relative w-28 h-28 my-6 mr-6">
                    <input
                      type="radio"
                      value={type}
                      name="types"
                      onChange={changeHandler}
                      className="z-20 appearance-none absolute h-full w-full cursor-pointer peer"
                    />
                    <div className="w-full space-y-2 h-full rounded absolute border peer-checked:border-2 peer-checked:border-stone-600 peer-checked:p-[2px] duration-100">
                      <img
                        src={type.image}
                        alt=""
                        className="w-full h-full rounded"
                      />
                      <p className="text-center text-sm text-stone-700">
                        {type.name}
                      </p>
                    </div>
                  </label>
                ))}
              </fieldset>
            </div>

            {/* upload image  */}
            <div className="">
              <p className="text-base text-stone-700 sm:text-lg mb-4"> Add Images</p>
              <label
                htmlFor="input-image"
                className="flex relative items-center justify-center w-32 h-24 p-4 border-dashed border border-stone-500 rounded cursor-pointer"
              >
                <input
                  type="file"
                  onChange={changeHandler}
                  name="images"
                  multiple
                  value={images} 
                  className="opacity-0 z-20 absolute w-full h-full cursor-pointer"
                />
                <svg
                  width="28px"
                  className="mx-auto absolute"
                  height="28px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#292524"
                  stroke="#292524"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title></title>{" "}
                    <g id="Complete">
                      {" "}
                      <g id="upload">
                        {" "}
                        <g>
                          {" "}
                          <path
                            d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
                            fill="none"
                            stroke="#292524"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></path>{" "}
                          <g>
                            {" "}
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7.9 6.7 12 2.7 16.1 6.7"
                              stroke="#292524"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            ></polyline>{" "}
                            <line
                              fill="none"
                              stroke="#292524"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              x1="12"
                              x2="12"
                              y1="16.3"
                              y2="4.8"
                            ></line>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </label>
                   <div className="flex mt-6 flex-wrap">
                 {
                     imagePreviews && imagePreviews.map((image)=>(
                        <img src={image} className="h-20 m-2 w-20 rounded" />
                     ))
                  }
                  </div>
            </div>

            
          </div>
        </div>

        <div className="space-x-6 my-24 mx-auto flex items-center justify-center w-full ">
          <Link
            to="/"
            className="border border-stone-700 text-sm hover:scale-105 duration-300 text-stone-700 font-medium px-6 py-1 rounded"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-stone-800 text-sm text-stone-300 border hover:scale-105 duration-300 px-6 py-1 rounded"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
    <Footer/>
  </>
  );
  
};

export default NewTrip;
