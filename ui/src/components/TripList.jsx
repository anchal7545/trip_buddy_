/** @format */

import React, { useEffect } from "react";
import TripCard from "./TripCard";
import { useGetAllTripQuery } from "../redux/api/tripApi";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// view this page after search

const TripList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stratlte = searchParams.get("startDate[lte]");
  const stratgte = searchParams.get("startDate[gte]");
  const keyword = searchParams.get("keyword");

  const { data, isLoading, isSuccess, isError } = useGetAllTripQuery({
    stratlte:stratlte ? stratlte : "",
    stratgte:stratgte ? stratgte : "",
    keyword
  });

  useEffect(() => {
  }, [isLoading, isSuccess]);

  return (
    <>
      <Header />
      {name ? (
        <h1 className="text-center text-lg text-gray-300">
          3 Result found related to{" "}
          <span className="text-gray-500 font-extralight">{query}</span>
        </h1>
      ) : (
        <h1 className="text-center my-8 text-lg text-gray-500">
          Join Your favourite destination
        </h1>
      )}
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="grid min-h-screen mb-28 gap-12 px-12 grid-cols-1 py-12 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
          {data && data?.trips.map((trip) => <TripCard trip={trip} />)}
        </div>
      )}
      <Footer />
    </>
  );
};

export default TripList;
