import asyncHandler from "express-async-handler";
import {generateAdminToken} from "../utils/generateToken.js";
import { authenticateAdmin,editUSer,getUsers } from "../utils/adminUtils.js";
import User from "../models/userModel.js";


const adminLogin = asyncHandler(async(req,res)=>{
    const admin = await authenticateAdmin(req.body);
    if(admin){
        generateAdminToken(res,admin._id);
        res.status(200)
        .json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            admin:true
         }) 
    }else{
        res.status(400)
        throw new Error("invalid email or password")
    }
});

const logoutAdmin = asyncHandler(async(req,res)=>{
    res.cookie('jwtadmin','',
    {
     httpOnly:true,
     expires:new Date(0)
    })
    res.status(200).json({message:'admin logout successfully'})
});


const getAllUsers = asyncHandler(async (req,res)=>{
 
    const users= await getUsers();
    if(users) {
        res.status(200).json(users)
    }else{
    res.status(400)
    throw new Error("no users found")
}

})


const getUser = asyncHandler(async(req,res)=>{
    let user = await User.findOne({_id:req.query.id})
    
    if(user){
        res.status(200).json(user)
    }else{
        throw new Error('Cant get user')
    }
});


const editUsersAdmin = asyncHandler(async(req,res)=>{

    const updatedUser = await editUSer(req.body);
    if(updatedUser){
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            message:"user updated successfully"
          });
    }else {
        res.status(404);
        throw new Error('email already exists');
      }
})



export {
    adminLogin,
    logoutAdmin,
    getAllUsers,
    getUser,
    editUsersAdmin
}
