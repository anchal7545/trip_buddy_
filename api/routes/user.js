import express from "express"
import {acceptRequest, addMembers, forgotPassword, getAllNotification, getGroup, getGroupChats, getMyAllGroups, getMyProfile, login, logout, resetPassword, searchUser, sendRequest, signup, uploadAvatar} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();


router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/forgot").post(forgotPassword) 
router.route("/resetpassword/:token").post(resetPassword) 
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getMyProfile)
router.route("/groups").get(isAuthenticated, getMyAllGroups)
router.route("/groups/:id").get(isAuthenticated, getGroup)
router.route("/groups/message/:id").get(isAuthenticated, getGroupChats)
router.route("/groups/members/add").put(isAuthenticated, addMembers)
router.route("/request/send").post(isAuthenticated, sendRequest)
router.route("/request/accept").put(isAuthenticated, acceptRequest)
router.route("/notifications").get(isAuthenticated, getAllNotification)
router.route("/search").get(isAuthenticated,searchUser)
router.route("/avatar").put(isAuthenticated,uploadAvatar)
export default router ;