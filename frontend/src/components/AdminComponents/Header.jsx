import { Navbar, Nav, Container ,NavDropdown, Badge} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {LinkContainer} from "react-router-bootstrap"
import { useSelector } from 'react-redux';
// import {useNavigate} from 'react-router-dom'
// import { adminLogoutR } from '../../slices/adminSlice';
// import { toast } from 'react-toastify';
// import { useAdminLogoutMutation} from '../../slices/adminApiSlice';



const Header = () => {
  const {admin} = useSelector((state)=>state.admin);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [adminLogout] = useAdminLogoutMutation();

// const logoutHandler = async () => {
//     try {
//         await adminLogout().unwrap();
//         dispatch(adminLogoutR());
//         navigate('/admin');
//     } catch (err) {
//         toast.error(err?.data?.message || err.error);
//     }
// };


  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to={'/admin'} >
            <Navbar.Brand >MERN App</Navbar.Brand>
            </LinkContainer>
         
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {admin ? 
               (
                <NavDropdown title={admin.name} id='username'>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
               ) 
               :
               (
                <>
                <LinkContainer to='/admin'>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                </>
               )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;