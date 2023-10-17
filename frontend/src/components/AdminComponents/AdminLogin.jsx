import React from 'react'
import { useState,useEffect } from 'react';
import FormContainer from '../FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useAdminLoginMutation } from '../../slices/adminApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import { adminLoginR } from '../../slices/adminSlice';
import { useNavigate } from "react-router-dom";




const AdminLogin = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminInfo = useSelector((state)=>state.admin.admin);

  useEffect(()=>{
    if(adminInfo){
      navigate('/admin/home')
    } 
  },[navigate,adminInfo])

  const [adminLogin] = useAdminLoginMutation()

  const submitHandle = async(e)=>{
    e.preventDefault();
    try{
      const res = await adminLogin({email,password}).unwrap();
      dispatch(adminLoginR({...res}));
      navigate('/admin/home')
    }catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <FormContainer>
           <ToastContainer/>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandle}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AdminLogin;
