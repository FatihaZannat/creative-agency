import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import './OrderProceed.css';
const OrderProceed = () => {
    const locationRef = useRef();
    const fromDateRef = useRef();
    const nameRef = useRef();
    const mobileRef = useRef();
    const toDateRef = useRef();
    const dateRef = useRef();
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders] = useContext(UserContext);
    // console.log(userBooks);

    function setUserData(){
        fetch(`https://book-life-bd.herokuapp.com/delete/user-books/email?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data){
                setUserBooks([]);
            }
        })

        fetch('https://book-life-bd.herokuapp.com/all-users-books')
        .then(res => res.json())
        .then(data => setAllUsersBooks(data))
    }

    let date = new Date();
    date.setHours( date.getHours() + 2 );
    let calFTime = date.getHours();
    let fTime = ( calFTime >= 12 ? ((calFTime % 12) + 12) : ( calFTime <10 ? `0${calFTime}` : calFTime) ) + ":00 " ;
    let calToTime = calFTime + 2;
    let tTime = ( calToTime >= 12 ? ((calToTime % 12) + 12) : ( calToTime <10 ? `0${calToTime}` : calToTime) ) + ":00 " ;
    let fromTime = calFTime;
    let toTime = calToTime;
    fromTime = ( calFTime >= 12 ? ((calFTime % 12) === 0 ? 12 : (calFTime  % 12)) : ( calFTime < 10 ? `0${calFTime}` : calFTime) ) + ":00 " + `${calFTime < 12 ? "AM" : "PM"}`;
    toTime = ( calToTime >= 12 ? ((calToTime % 12) === 0 ? 12 : (calToTime % 12)) : (calToTime < 10 ? `0${calToTime}` : calToTime) ) + ":00 " + `${calToTime < 12 ? "AM" : "PM"}`;

    const history = useHistory();
    const handleSubmit = (evt) =>{
        evt.preventDefault();

        const orders = {
            name: evt.target.name.value,
            location: evt.target.location.value,
            mobile: evt.target.mobile.value,
            fromTime: evt.target.fromTime.value,
            toTime: evt.target.toTime.value,
            userBooks: userBooks,
            userEmail: loggedInUser.email
        }
        // console.log(orders);
        fetch(`https://book-life-bd.herokuapp.com/update-user/orders?email=${loggedInUser.email}`, {
            method: "POST",
            body: JSON.stringify(orders),
             headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            locationRef.current.value = null;
            fromDateRef.current.value = null;
            mobileRef.current.value = null;
            toDateRef.current.value = null;
            dateRef.current.value = null;
            nameRef.current.value = null;
            if(data._id){
                setUserOrders(data);
            }
            setUserData();
            history.replace(`/user-orders?email=${loggedInUser.email}`)
        })
        .catch(err => console.log(err, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, userOrders))
    }
    return (
        <div className="w-100 mx-auto my-3 mb-5">
            <div style={{marginTop: ''}} data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos-offset="100" className="p-4 shadow bg-light card order-proceed-from mx-auto justify-content-center align-items-center">
                {
                    userBooks.length !== 0 
                    ? <>
                        <h5 className='font-weight-bold'>Enter Your Details:</h5>
                        <form  onSubmit={handleSubmit} id="checkOutForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input ref={nameRef} type="text" name="name"  className='form-control' id="name" placeholder='Name' required/>    
                            </div>
                            <div className="from-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input ref={mobileRef} type="tel" name="mobile" id="mobile" className="form-control" placeholder="+880" required/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="location">Location</label>
                                <textarea ref={locationRef}  name="location" cols="10" rows="2" className='form-control' id="location" placeholder='@address' required/>    
                            </div>
                            <div className="from-group mt-1">
                                <label htmlFor="date">Date</label>
                                <input ref={dateRef} type="date" name="date" id="date" className="form-control" placeholder="date" required/>
                            </div>
                            <p className="mt-1 mb-1">Time</p>
                            <div className="row w-100 mx-auto">
                                <div className="col-md-5 col-sm-12 from-group">
                                    <div className="row">
                                        <input ref={fromDateRef} type="time" name="fromTime" id="time" className="form-control col-md-10" placeholder="time" min={"09:00"} max={fTime} required/>
                                        <span className="validity col-md-2 d-flex align-items-center justify-content-center"></span>
                                    </div>
                                </div>
                                <p className="text-info text-center col-md-2 d-flex justify-content-center align-items-end mt-2">To</p>
                                <div className="col-md-5 col-sm-12 from-group">
                                    <div className="row">
                                        <input ref={toDateRef} type="time" name="toTime" id="time" className="form-control col-md-10" placeholder="time" min={tTime} max="23:00" required/>
                                        <span className="validity col-md-2 d-flex align-items-center justify-content-center"></span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-danger order-time my-1 text-center"> ORDER WILL BE DELIVERED WITHIN <span className="text-success">{ fromTime }</span> to <span className="text-success">{ toTime }</span> ON TODAY</p>
                        </form>
                        <div className="d-flex justify-content-center my-1">
                            <button type="submit" form="checkOutForm" className="btn btn-success">CHECKOUT PROCEED</button>
                        </div>
                    </>
                    : <div data-aos="flip-left" data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"  className="p-1 text-center">
                        <img data-aos="fade-down" data-aos-duration="3000" src="https://media1.giphy.com/media/myqW4XYBkh0UOIIcCb/source.gif" className="img-fluid w-50 mx-auto"  alt=""/>
                        <h6 className="text-center text-danger">Sorry!!! Your order is not available</h6>
                        <p className="text-center font-weight-bold text-info">Please go to the home page to order first</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default OrderProceed;