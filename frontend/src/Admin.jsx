import Header from './components/AdminComponents/Header';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Admin;
