import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { activeTrips, delete_trip, getMyTrips, getMyTripsAsMember, getTrip, getTrips, mostVisited, new_trip, update_trip } from "../controllers/trip.js";
const router = express.Router();


router.route("/trips").post(isAuthenticated,new_trip)
router.route("/trips").get(getTrips)
router.route("/trips/active").get(activeTrips)
router.route("/trips/most").get(mostVisited)
router.route("/trips/my").get(isAuthenticated, getMyTrips)
router.route("/trips/members").get(isAuthenticated,getMyTripsAsMember)
router.route("/trips/:id").put(isAuthenticated,update_trip)
router.route("/trips/:id").get(getTrip)
router.route("/trips/:id").delete(isAuthenticated,delete_trip)


export default router ; 