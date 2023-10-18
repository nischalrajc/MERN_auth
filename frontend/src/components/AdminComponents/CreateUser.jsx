import {useState} from "react"
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from "../FormContainer";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../slices/adminApiSlice";
import { toast } from 'react-toastify';



const CreateUser = () => {

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    
    const navigate = useNavigate();

    const [create] = useCreateUserMutation();

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(user.password !== user.confirmPassword){
            toast.error('Passwords do not match');
        }else{
            try {
                  const res= await create(user).unwrap();
                  if(res){
                  toast.success("user created successfully")
                  }
                  navigate('/admin/home')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }


  return (
    <FormContainer>
      <h1>Create</h1>
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

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            
            placeholder='Enter password'
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
           
          ></Form.Control>
          
        </Form.Group>


        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={user.confirmPassword}
            onChange={(e) => setUser({...user,confirmPassword:e.target.value})}
          ></Form.Control>
        </Form.Group>
       
        <Button type='submit' variant='primary' className='mt-3'>
          Create
        </Button>
      </Form>

    
    </FormContainer>
  );
};

export default CreateUser;