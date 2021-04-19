import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import google from '../../images/icons/Group 573.png';
import './Login.css';
import "firebase/auth";
import firebase from "firebase/app";
// import * as firebase from "firebase/app";
import firebaseConfig from '../firebase.config/firebase.config';
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig);
const Login = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks] = useContext(UserContext);
    // const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const checkRef = useRef();const [user, setUser] = useState("admin");
    const history = useHistory();
    const location = useLocation();
    // console.log(location);
    let {pathname} = location;
    if( pathname === "/login?user=admin" ){
        pathname = pathname.replace("/login?user=",'');
    }
    const search = pathname;
    // console.log(search);
    useEffect(() =>{
        if(search === "admin" && user === "admin"){
            setUser(search);
        }
        else{
            setUser('customer');
        }
    },[])

    const {from} = location.state || { from: { pathname: "/"}};
    const [wrongMessage, setWrongMessage] = useState(false);
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        let userType = evt.target.name.value;
        const currentUser = user;
        // console.log(currentUser);
        // console.log(userType);
        if(currentUser === "customer"){
            userType = "customer";
            setWrongMessage(false);
        }
        else {
            if(userType === "ADMIN-MMHK"){
                userType = "admin";
                setWrongMessage(false);
            }
            else{
                setWrongMessage(true);
                return;
            }
            checkRef.current.value = null;
        }
        // console.log(userType);

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            // The signed-in user info.
            const curUser = result.user;
            // console.log(user);
            const {displayName, email, photoURL} = curUser;
            const myUser = {
                email,
                displayName,
                photoURL,
                userType: userType
            }
            setLoggedInUser(myUser);          
             fetch(`https://book-life-bd.herokuapp.com/user-books?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserBooks(data);
            })
            if(search === 'admin' && user === 'customer'){
                history.push('/');
            }
            else if(user === "admin"){
                history.push('/admin/admin');
            }
            else{
                history.replace(from);
            }
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage, loggedInUser,  books, setBooks, userBooks);
        });
    }

    const handleUserClick = (userType) =>{
        // checkRef.current.value = null;
        setWrongMessage(false);
        setUser(userType);
    }
    return (
        // <div data-aos="flip-up" className="jumbotron shadow bg-light mx-auto rounded d-flex justify-content-center p-5 login-field" style={{marginTop: '145px'}}>
        //     <button onClick={handleClick} className="btn btn-outline-warning w-100 mx-auto" style={{borderRadius: '30px'}} ><img src={google} alt="" style={{height: '25px'}} /> Continue With Google</button>
        // </div>
        <div data-aos="flip-up" data-aos-easing="ease-out-cubic"
        data-aos-duration="2000" className="p-5">
        <h3 data-aos="fade-down" data-aos-duration="2000" style={{marginTop: '50px'}} className="text-center mb-4">Login { user === "admin" && <span>As An Admin</span>}</h3>
        <div className="jumbotron mx-auto rounded shadow bg-light login-field">
            {
                user === "customer" || user === ""
                ? <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn btn-outline-warning w-100 mx-auto" style={{borderRadius: '30px'}} ><img src={google} alt="" style={{height: '25px'}} /> Continue With Google</button>
                    <p onClick={() => handleUserClick("admin")} style={{textDecoration: 'underline', cursor: 'pointer'}} className="text-danger text-center mt-2">Login as an admin</p>
                </form>
                : <form onSubmit={handleSubmit}>
                    <p className="text-center text-danger"><small>Please Write Here Carefully "ADMIN-MMHK"</small></p>
                    <textarea ref={checkRef} id="admin" name="name" type="text" className="form-control" cols="15" rows="1" placeholder="@@@admin code" required/>
                    <button type="submit" className="btn btn-outline-info w-100 mx-auto mt-2" style={{borderRadius: '30px'}} ><img src={google} alt="" style={{height: '25px'}} /> Continue With Google</button>
                    <p onClick={() => handleUserClick("customer")} style={{textDecoration: 'underline', cursor: 'pointer'}} className="text-success text-center mt-2">Login as a user</p>
                    {
                        wrongMessage && <p className="text-center text-info">
                            Sorry!!! you have written wrong quote
                        </p>
                    }
                </form>
            }
        </div>
    </div>
    );
};

export default Login;