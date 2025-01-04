/** @format */

import React, { useEffect } from "react";
import { useGetMostVisitedQuery } from "../../redux/api/tripApi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const MostVisitedPlace = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetMostVisitedQuery();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop1: {
      breakpoint: { max: 1024, min: 900 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 900, min: 564 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };


  useEffect(() => {
    if (isError) toast.error(error?.data?.error);
  }, [isError, isSuccess]);

  return (
    <>
      
      <div
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 44%, 0 81%)" }}
        className="w-full flex h-full bg-white sm:bg-stone-800 absolute p-8"
      ></div>

     {data && data?.allTrips && data.allTrips?.length > 0  && 
     
      <div className="w-full sm:w-[80%] left-0 right-0 mx-auto  absolute px-12">
      <Carousel
        swipeable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {
           data && data?.allTrips ? data?.allTrips?.map((trip) => {
              return ( 
                   <MostVisitedPlaceCard trip={trip}/>
              );
             }) : <></>
        }
        </Carousel> 
       </div>
     }
    </>
  
  );
};

export default MostVisitedPlace;




const MostVisitedPlaceCard = ({trip}) => {
  return (
   
   <Link to={`/trip-view/${trip?._id}`}  className="flex flex-col md:flex-row md:space-y-0 space-y-6 mt-24 w-full">
     <div className="h-full w-full rounded text-stone-400">
       <img
         src="/images/img2.jpg"
         alt=""
         className="h-[70%] rounded-t w-full"
       />
       <div className="space-y-2 py-3">
         <p className="text-lg font-thin"> Location : Roorkee , Haridwar Uttarakhand</p>
         <p className="text-xs"> Travelling Date :  {new Date(trip?.endDate).toJSON().slice(0, 10)} </p>
         <p className="text-base text-ellipsis">{trip?.description}</p>
       </div>
     </div>
     <div className="min-h-full w-full rounded">
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
   </Link>

  )
}

