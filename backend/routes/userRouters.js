import express from "express";
import { authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateProfile,
    profilePic } from "../controllers/userController.js";
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js";

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateProfile)
router.put('/image',protect,profilePic)


export default router;