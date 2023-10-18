import React from 'react'
import { useEffect,useState } from 'react';
import { useGetUserMutation,useDeleteUserMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  useSelector,useDispatch} from "react-redux";


const AdminHome = () => {

    const [searhText,setSearchText] =useState("");
    const [users,setUsers] = useState([])
    const [status,setStatus] = useState(false)
    const [filteredUser,setFilteredUser] = useState([])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [getUser] = useGetUserMutation();
    const [deleteUser] = useDeleteUserMutation();


    useEffect(()=>{
        getAllUsers();
   },[status])


   async function getAllUsers(){
    try{
        const res = await getUser().unwrap();
        setUsers(res);
        setFilteredUser(res);
    }catch(err){
        toast.error(err?.data?.message || err.error);
    }
   };


   const filterData=(data,userData)=>{
    return userData.filter((item)=>
      item?.name?.toLowerCase()?.includes(data.toLowerCase())
    )
   };


   const deleteUSers = async (id)=>{
    try {
        const res = await deleteUser(id).unwrap();
        console.log(res)
        if(res){
            setStatus(!status);
            toast.success("User deleted successfully")          
        }else{
            toast.error('No user exist');
        }
    } catch (error) {
        console.log(error)
    }
   };



  return (
    <div className='container'>
        <h2>ADMIN PANEL</h2>
        <button className="btn btn-success my-3" onClick={()=>navigate('/admin/create')}>Create +</button>
        <input className="mx-2 p-1" type="search" placeholder="search here..."
          value={searhText}
          onChange={(e)=>{
            setSearchText(e.target.value)
            const data = filterData(searhText,filteredUser)
            setUsers(data)
          }}
        ></input>     
        <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>                  
                    {
                        users?.map((user,index)=>
                            <tr key={user._id}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={()=>navigate(`/admin/edit/${user._id}`)}>Edit</button>
                                <button className="btn btn-sm btn-danger ms-2" onClick={()=>deleteUSers(user._id)} >Delete</button>
                            </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>    
    </div>
  )
}

export default AdminHome
