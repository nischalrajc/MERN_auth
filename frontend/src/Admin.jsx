import Header from './components/AdminComponents/Header';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

const Admin = () => {
  return (
    <div>
      <Header/>
      <ToastContainer/>
      <Outlet/>
    </div>
  )
}

export default Admin;
