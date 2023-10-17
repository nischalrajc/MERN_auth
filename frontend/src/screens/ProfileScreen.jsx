import React from 'react'
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { useUpdateUSerProfilePicMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader'



const ProfileScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const [image,setImage]=useState(null)
    const [pic,setPic] = useState(null)

    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);
    const [updateProfile,{isLoading}] = useUpdateUserMutation();
    const [updateUserProfilePic] = useUpdateUSerProfilePicMutation();

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
        setImage(userInfo.image)
    },[userInfo.name,userInfo.email,userInfo.image]);


    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('password do not match');
        }else{
           try {
            const res = await updateProfile({
                _id:userInfo._id,
                name,
                email,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile Updated');
           } catch (err) {
            toast.error(err?.data?.message || err.error);
           }
        }
    };

    const handleProfile = async (e)=>{
        e.preventDefault();
        
        if(!pic)toast.error('please select an image')
        else{
          const formData = new FormData();
          formData.append('image', pic);
          
          try {
            const res = await updateUserProfilePic(
              formData
             ).unwrap();
             dispatch(setCredentials({ ...res }));
             toast.success('Profile picture added successfully');
            
          } catch (error) {
    
            toast.error(err?.data?.message || err.error);
            
          }
          
        }
      }


  return (
    <FormContainer>
        <h1>Update Profile</h1>

        {pic ?
      <img alt="profile" width="200px" height="200px" src={pic ? URL.createObjectURL(pic) : ''}></img>
       :
       <img alt="profile" width="200px" height="200px" src={`http://localhost:5000/image/${image}`}></img>
       }

        <Form onSubmit={handleProfile} encType='multipart/form-data'>
         <Form.Group className='my-2' controlId='name'>
            <Form.Label>Image</Form.Label>
                <Form.Control
                type='file'
                onChange={(e)=>setPic(e.target.files[0])}
                >        
            </Form.Control> 
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>
            Upload
            </Button>
        </Form>

        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control
                type="confirmPassword"
                placeholder="Enter ConfirmPassword"
                value={confirmPassword}
                onChange={(e)=>setconfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>


            {isLoading && <Loader/>}


            <Button type="submit" variant="primary" className="mt-3 ">
                Update
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen;
