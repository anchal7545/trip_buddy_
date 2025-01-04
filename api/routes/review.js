import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { deleteReview, getReview, newReview } from "../controllers/review.js";
const router = express.Router();


router.route("/review").post(isAuthenticated,newReview)
router.route("/review/:id").delete(isAuthenticated,deleteReview)
router.route("/review/:id").get(getReview)



export default router ; 