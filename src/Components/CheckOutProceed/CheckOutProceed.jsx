import React, { useContext, useEffect, useState } from 'react';
import congratulate from '../../images/congratulation.gif';
import congratulate3 from '../../images/congratulation3.gif';
import Modal from 'react-bootstrap/Modal';
import './CheckOutProceed.css';
import { UserContext } from '../../App';
const CheckOutProceed = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders] = useContext(UserContext);

    // console.log(userOrders)
    const [modalShow, setModalShow] = useState(false);

    useEffect(() =>{
        fetch(`https://book-life-bd.herokuapp.com/user-order?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setUserOrders(data);
        })
        .catch(err => console.log(err, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders))
    }, [])
    // Pore orders nia kaj korte hobe...
    // console.log(userOrders)
    const {order} = userOrders;
    // console.log(order)
    return (
        <>
            {
                order && <div data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000" className="container py-4">
                    <div className="my-5 p-3 bg-light shadow card justify-content-center mx-auto w-75">
                        <img src={congratulate} className="w-75 mx-auto" alt=""/>
                        <div className="d-flex">
                            <img src={congratulate3} className="w-25" alt=""/>
                            <h6  className="text-center text-info w-50 h-75 my-auto">Your order has been proceeded</h6>
                            <img src={congratulate3} className="w-25" alt=""/>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button onClick={() => setModalShow(true)} className="btn btn-info">SEE YOUR ORDER</button>
                        </div>
                        <MyVerticallyCenteredModal
                            order={order}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                    
                </div>
            }
        </>
    );
};

export default CheckOutProceed;

function MyVerticallyCenteredModal(props) {
    const order = props.order;
    console.log(order)
    const { name,mobile, location, userBooks} = order;
    let total = 0;
    for(let i=0;i<userBooks.length;i++){
        total += userBooks[i].quantity * parseInt(userBooks[i].bookPrice);
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="" id="contained-modal-title-vcenter">
            <span className="text-danger">Order Details</span><br/>
            <span className="text-info">Cash on delivery system</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="text-center"><span className="text-warning">Name: </span> {name}</p>
            <p className="text-center"><span className="text-warning">Mobile: </span>{mobile} </p>
            <p className="text-center"><span className="text-warning">Location: </span>{location} </p>
          {
              userBooks.length !== 0 && <div className=' ' >
                  {
                      userBooks.map(userBook => <div key={userBook._id} className="w-50 mx-auto jumbotron shadow p-2 text-center">
                          <p className="my-0">{userBook.bookName}</p>
                          <h6 className="text-success"><small>By: {userBook.authorName}</small></h6>
                          <div className="row">
                            <div className="col-md-4">
                                <img className="img-fluid w-75 mx-auto" src={userBook.imgUrl} alt=""/>
                            </div>
                            <div className="col-md-4 align-items-center d-flex justify-content-center">
                                <p><small>{userBook.quantity}</small></p>
                            </div>
                            <div className="col-md-4 align-items-center d-flex justify-content-center">
                                <p><small>${userBook.quantity * userBook.bookPrice}</small></p>
                            </div>
                          </div>
                      </div>
                    )
                  }
                  <p className="text-center text-danger font-weight-bold">Total = ${total}</p>
              </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }