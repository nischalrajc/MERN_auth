import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Admin from './Admin.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminLogin from './components/AdminComponents/AdminLogin.jsx'
import AdminPrivateRoute from './components/AdminComponents/AdminPrivateRoute.jsx'
import AdminHome from './components/AdminComponents/AdminHome.jsx'
import EditUser from './components/AdminComponents/EditUser.jsx'
import CreateUser from './components/AdminComponents/CreateUser.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App/>}>
       <Route index={true} path='/' element={<HomeScreen/>}/>
       <Route path='/login' element={<LoginScreen/>}/>
       <Route path='/register' element={<RegisterScreen/>}/>
       {/* {Private Routes} */}
       <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen/>}/>
       </Route>
    </Route>

   <Route path='/admin' element={<Admin/>} >
    <Route path='/admin' element={<AdminLogin/>}></Route>
    <Route path='' element={<AdminPrivateRoute/>}>
      <Route path='home' element={<AdminHome/>}></Route>
      <Route path='edit/:id' element={<EditUser/>}></Route>
      <Route path='create' element={<CreateUser/>}></Route>
    </Route>
   </Route>
  </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>
  </Provider>,
)
