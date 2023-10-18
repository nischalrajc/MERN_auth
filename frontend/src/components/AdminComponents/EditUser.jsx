import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from "../FormContainer";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useEditUserMutation,useUpdateUserAdminMutation } from '../../slices/adminApiSlice';
import { useNavigate } from 'react-router-dom';


const EditUser = () => {
    const {id} = useParams();
    const [user,setUser] = useState({
        name:'',
        email:'',
        id:'',
    })

    const [editUser] = useEditUserMutation();
    const [updateUserAdmin] = useUpdateUserAdminMutation();

    const navigate = useNavigate();

    useEffect(()=>{
        userDetails()
    },[])

    async function userDetails(){
        try {
          const res = await editUser(id).unwrap();
          setUser({
            name:res.name,
            email:res.email,
            _id:res._id
          })
            
        } catch (err) {
            
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res = await  updateUserAdmin(user).unwrap()
            toast.success('Updated succesfully')
            navigate('/admin/home')
            
        } catch (err) {            
            toast.error(err?.data?.message || err.error);
        }

    }

  return (
    
    <FormContainer>
      <h1>EDIT</h1>
      <Form onSubmit={submitHandler}>
         
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={user.name}
            onChange={(e) => setUser({...user,name:e.target.value})}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            
            placeholder='Enter email'
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
           
          ></Form.Control>
            
        </Form.Group>   
        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>   
    </FormContainer>
  );
};

export default EditUser;