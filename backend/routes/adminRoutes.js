import express from "express";
const router = express.Router()
import { protectAdmin } from "../middleware/authMiddleware.js";
import { adminLogin,logoutAdmin,getAllUsers,getUser,editUsersAdmin,deleteUsers,createUserAdmin} from "../controllers/adminController.js";

router.post('/login',adminLogin)
router.post('/logout',logoutAdmin)

router.route('/users')
  .get(protectAdmin, getAllUsers)
  .post(protectAdmin,createUserAdmin)
  .delete(protectAdmin,deleteUsers)


router.route('/edit')
  .get(protectAdmin,getUser)
  .put(protectAdmin,editUsersAdmin)
  


export default router;