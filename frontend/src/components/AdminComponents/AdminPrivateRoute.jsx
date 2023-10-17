import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = () => {
  const { admin } = useSelector((state) => state.admin);
  return admin ? <Outlet /> : <Navigate to='/admin' replace />;
};
export default AdminPrivateRoute;