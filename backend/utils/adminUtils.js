import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
// import User from "../models/userModel";

const authenticateAdmin = asyncHandler(async(data)=>{
    const {email,password} = data;
    let admin = await Admin.findOne({email});
    if(admin && (await admin.matchPasswords(password))){
        return admin;
    }else{
        return false
    }
});


 const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find();
    if(users) return users
    return false;
})


const editUSer = asyncHandler(async(data)=>{
    const {name,email,_id} = data;
    let user = await User.findById(_id);
    if(user){
        if(user.email != email){
            let userExist =await User.findOne({email:email})
            if(userExist){
                return false;
            }
        }
        user.name = name || user.name;
        user.email=email || user.email;
        const updatedUser = await user.save()
        return updatedUser;
    }
    return false;
})

export {
    authenticateAdmin,
    editUSer,
    getUsers
}