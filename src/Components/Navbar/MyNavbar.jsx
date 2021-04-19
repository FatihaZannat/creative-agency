import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useHistory } from 'react-router-dom';
// import logo from '../../images/icons/book_life_logo.png';
import './MyNavbar.css';
import { UserContext } from '../../App';
const MyNavbar = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders] = useContext(UserContext);
    const history = useHistory();
    const handleLogout = () =>{
        setLoggedInUser({});
        // setBooks([]);
        setUserBooks([]);
        // setAllUsersBooks([]);
        setUserOrders({});
        history.push('/');
        if(false){
            console.log(books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders)
        }
    }
    return (
        <div className="container">
            <Navbar className='' collapseOnSelect expand="lg" bg="white" variant="light">
            <Navbar.Brand data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"><Link to='/'></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/home" className="mr-4 nav-link">Home</Link>
                    <Link to="/order/all-books" className="mr-4 nav-link">Orders</Link>
                    <Link to="/order-proceed" className="mr-4 nav-link">Deals</Link>
                    {
                        loggedInUser.userType !== "customer" && <Link to="/admin/admin" className="mr-4 nav-link">Admin</Link>
                    }
                    {
                        loggedInUser.email 
                        ? <>
                            <Link to="/" className="mr-0 nav-link">
                                <p className="my-auto"><img style={{height: "30px"}} className="rounded-circle ml-2 " src={loggedInUser.photoURL} alt=""/> <small className="ml-1 mr-2 font-weight-bold">{loggedInUser.displayName.match(/\b\w/g).join('')}</small></p>
                            </Link>
                            <span onClick={handleLogout} className="mr-0 nav-link">Logout</span>
                        </>
                        : <Link to="/login" className="mr-0 nav-link">Login</Link>
                    }
                    
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default MyNavbar;