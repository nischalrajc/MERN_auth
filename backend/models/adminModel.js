import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"


const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
},{
    timestamps:true
});

adminSchema.methods.matchPasswords = async function (enteredPassword){
    return enteredPassword === this.password; 
}


const Admin = mongoose.model('Admin',adminSchema);

export default Admin;