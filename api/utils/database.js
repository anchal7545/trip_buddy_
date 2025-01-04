import mongoose from "mongoose";

 export const connectDb = () => {
    mongoose
      .connect("mongodb://localhost:27017/trip_buddy")
      .then(() => {
        console.log("connected");
      })
      .catch((err) => {
        throw err;
      });
  };
  