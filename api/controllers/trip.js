/** @format */
import Trip from "../models/trip.js";
import Group from "../models/group.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ApiFeature from "../utils/apiFeature.js";
import trip from "../models/trip.js";
import cloudinary from "cloudinary"


export const new_trip = catchAsyncError(async (req, res, next) => {
  const { name, endDate, description,images,types } = req.body;
  const members = [];
  members.push(req.user);
  const imagesArr=[]

  if(images.length > 0){
    
    for(let i=0;i<images.length; i++){
      const cloud =  await cloudinary.v2.uploader.upload(images[i],{
        folder:'avatars',
        width:150,
        crop:'scale'
      })
      imagesArr.push({
         user:req.user._id,
         public_id:cloud.public_id,
         url:cloud.secure_url 
      })  

    }
  }

  const group = await Group.create({ name, admin: req.user, members });
  const trip = await Trip.create({
    name,
    members,
    images:imagesArr,
    description,
    admin: req.user,
    endDate,
    groupId: group._id,
    types
  });
  group.tripId = trip._id;
  await group.save();

  res.status(201).json({
    success: true,
    message: "Trip Created",
    trip,
    group,
  });
});




export const getTrips = catchAsyncError(async (req, res, next) => {
  const apifeature = new ApiFeature(Trip.find(), req.query).search().filter();
  const trips = await apifeature.query;
  trips.map(async (trip) => {
    const isActive = trip.endDate.toISOString() > new Date().toISOString();
    trip.active = isActive;
    await trip.save();
  });
  res.status(200).json({
    success: true,
    trips,
  });
});



export const activeTrips = catchAsyncError(async (req, res, next) => {
  const trips = await Trip.aggregate([
    {
      $match: {
        'active': true
      },
    },
    {
      $sort: { startDate: 1 }
    }

  ]);

  res.status(200).json({
    success: true,
    trips,
  });
});



export const mostVisited = catchAsyncError(async (req, res, next) => {

  const trips = await Trip.aggregate([
     
          {
            $group:{
              _id:"$name",
              count:{
                  $sum:1
              },
            }
          },

          {
              $sort:{
                  count:-1  
              }
          },
          {
                $limit:4         
          }

     ]);

      const allTrips=[]
      for(let i=0 ; i<trips.length ; i++){
         const new_trip = await Trip.findOne({name:trips[i]._id}) 
         allTrips.push(new_trip)
      }
      
      res.status(200).json({
        success: true,
        allTrips
      });

});



export const update_trip = catchAsyncError(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return next(new ErrorHandler("Trip Not Found", 404));
  }

  if (trip.admin.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You cannot update name", 404));
  }

  await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    success: true,
    message: "Name Updated",
  });
});

export const getTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);
  if (!trip) {
    return next(new ErrorHandler("Trip Not Found", 404));
  }

  res.status(200).json({
    success: true,
    trip,
  });
});

export const delete_trip = catchAsyncError(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) {
    return next(new ErrorHandler("Trip Not Found", 404));
  }
  if (trip.admin.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete", 403));
  }
  await trip.deleteOne();

  res.status(200).json({
    success: true,
    message: "Trip deleted",
  });
});

export const getMyTrips = catchAsyncError(async (req, res, next) => {
  const trips = await Trip.find({ admin: req.user._id });
  res.status(200).json({
    success: true,
    trips,
  });
});

export const getMyTripsAsMember = catchAsyncError(async (req, res, next) => {
  const trips = await Trip.find({ members: req.user._id });
  res.status(200).json({
    success: true,
    trips,
  });
});
