/** @format */

import bcrypt from "bcrypt";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary"
import Group from "../models/group.js";
import Message from "../models/message.js";
import {Request} from "../models/request.js";
import { emitEvent } from "../utils/util.js";
import { NEW_REQUEST, REFETCH_CHAT } from "../utils/constants.js";


export const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = await User.create({ name, email, password });
  sendToken(res, user, "Logged in", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  sendToken(res, user, "Account created", 200);
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      // sameSite:'none'
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please Fill required field", 400));
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) return next(new ErrorHandler("Incorrect old password", 401));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { email, name } = req.body;
  const user = await User.findById(req.user.id);
  if (email) user.email = email;
  if (name) user.name = name;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("Please enter valid email", 400));
  const resetToken = await user.getResetToken();
  await user.save();
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`; //http://localhost:3000/resetpassword/token
  const message = `Click on the link to reset password . ${url}. If you have not requested then please ignore it.`;
  // send email
  await sendEmail(user.email, "Travel_together Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

// reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("Token is invalid or has been expired ,Try again", 401)
    );

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
});

export const getMyAllGroups = catchAsyncError(async (req, res, next) => {
  const groups = await Group.find({ members: req.user });
  res.status(200).json({
    success: true,
    groups,
  });
});

export const getGroup = catchAsyncError(async (req, res, next) => {
  const group = await Group.findById(req.params.id).populate('members tripId','name avatar types endDate');
  res.status(200).json({
    success: true,
    group,
  });
});




export const getGroupChats = catchAsyncError(async (req, res, next) => {
  const chatMessage = await Message.find({ groupId: req.params.id });

  res.status(200).json({
    success: true,
    chatMessage,
  });
});



export const addMembers = catchAsyncError(async (req, res, next) => {
   const {memberId,groupId} = req.body 
   const  member = await User.findById(memberId) 
   if(!member)
    return next(
      new ErrorHandler("Member not found", 401)
    );
  const group = await Group.findById({_id:groupId})
  
  const isExist = group.members.find((item)=> item.toString()===memberId) 
  if(isExist)
     return next(
        new ErrorHandler("Member already added", 401)
   );

  group.members.push(memberId) 
  await group.save()

  res.status(200).json({
    success: true,
    message:"Members added successfully"
  });

});


export const sendRequest = catchAsyncError(async (req, res, next) => {
  // we can send request group admin only
  // here receiver = group admin | sender = req.user 
   const {owner,groupId} = req.body
   const requestExist = await Request.findOne({sender:req.user,receiver:owner});
   if(requestExist){
      return next(new ErrorHandler("Request already sent ",400))
   }
   const request = await Request.create({
       sender:req.user ,
       receiver:owner,
       groupId
   })

    emitEvent(req, NEW_REQUEST, owner,"You received a request");
    res.status(200).json({
      success: true,
      message:"Request has been sent"
    });
});


export const acceptRequest = catchAsyncError(async (req, res, next) => {
  
  const {accept,requestId}  = req.body 
  const request  = await Request.findById(requestId) 
  if(!request){
    return next(new ErrorHandler("Request not exist ",400))  
  }
 
  if(request?.receiver.toString()!==req.user._id.toString())
    return next(new ErrorHandler("You cannot accept this request ",400))

  if(!accept){
      await request.deleteOne()
      res.status(200).json({
        success: true,
        message:"Request Rejected"
      });
  }
  else{
    const group = await Group.findById(request.groupId)
    group.members.push(request.sender)
    await group.save()  
    await request.deleteOne()
    emitEvent(req,REFETCH_CHAT,group.members);
    res.status(200).json({
      success: true,
      message:"Request accepted"
    });

  }
});


export const getAllNotification = catchAsyncError(async (req, res, next) => {
  const requests = await Request.find({receiver:req.user}).populate("sender","name avatar")
  const allRequests = requests.map((_id,sender)=> ({
     _id,
     sender:{
        _id:sender._id,
        name:sender.name,
        // avatar:sender.avatar.url 
     }
  }))

  return res.status(200).json({
     success:true,
     allRequests
  })

});



export const searchUser = catchAsyncError(async (req, res, next) => {
  const { name =""} = req.query;
  const myGroups = await Group.find({ members: req.user._id });
  const allUserFromMyGroups = myGroups.map((group) => group.members).flat();
 
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUserFromMyGroups },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map((_id, name, avatar) => ({
    _id,
    name,
    // avatar: avatar.url,
  }));

  res.status(200).json({
    success: true,
    users,
  });
});


export const uploadAvatar = catchAsyncError(async (req, res, next) => {
 
   const user = await User.findById(req.user._id)
   if(req.body.avatar==="" || req.body.avatar===undefined)
     return next(new ErrorHandler("Please Choose Profile Image",401))
  
  
   if(user?.avatar?.public_id){
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
   }
  
   const cloud =  await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
   })

    const avatar = {
      public_id:cloud.public_id,
      url:cloud.secure_url 
    } 

   
    await User.findByIdAndUpdate(req.user._id,{avatar},{
          new: true,
          runValidators: true,
          useFindAndModify: false,
    })


  res.status(200).json({
    success: true,
    message:"profile updated"
  });

});

