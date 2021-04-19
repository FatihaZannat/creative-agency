import React, { useContext, useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Orders.css';

const Orders = () => {
    const {key} = useParams();
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks] = useContext(UserContext);
    const {email} = loggedInUser;
    // console.log(allUsersBooks);
    function setUserData(){
        fetch(`https://book-life-bd.herokuapp.com/user-books?email=${email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setUserBooks(data);
        })

        fetch('https://book-life-bd.herokuapp.com/all-users-books')
        .then(res => res.json())
        .then(data => setAllUsersBooks(data))
    }
    
    useEffect(()=>{
        if(key === "all-books"){
            setUserData();
        }
        else{
            const userBook = books.find(book => book._id === key);
            // console.log(userBook);
            const newUserBook = {
                key: key,
                bookName: userBook.bookName,
                authorName: userBook.authorName,
                bookPrice: userBook.bookPrice,
                imgUrl: userBook.imgUrl,
                quantity: 1,
                userEmail: loggedInUser.email
            }
            // console.log(allUsersBooks);
            const userBookForId = allUsersBooks.find(allUsersBook =>  allUsersBook.key === key && allUsersBook.userEmail === loggedInUser.email)
            // console.log(userBookForId);
            let _id;
            if(!userBookForId){
                // console.log(('insertion'));
                fetch(`https://book-life-bd.herokuapp.com/user/add-book`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if(data){
                        // console.log(data);
                        setUserData();
                    }
    
                })
                .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
            else{
                // console.log("update");
                _id = userBookForId._id;
                fetch(`https://book-life-bd.herokuapp.com/user-book/update-from-book-card/${_id}?email=${email}`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if(data){
                        // console.log(data);
                        setUserData();
                    }
    
                })
                .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
            // console.log(newBook);
        }
    }, [])
    // console.log(key);
    const handleIncreaseDecrease = (flag, id, price) =>{
        const quantity = document.getElementById(id);
        const bookPrice = document.getElementById(id+'-price');
        const total = document.getElementById('total');
        // console.log(quantity);
        let value = parseInt(quantity.innerText);
        // console.log(value);
        let totalValue;
        if(flag === "-"){
            if(value === 1){
                return;
            }
            value--;
            totalValue = parseInt(total.innerText) - parseInt(price);
        }
        else{
            value++;
             totalValue = parseInt(total.innerText) + parseInt(price);
        }
        quantity.innerText = value;
        bookPrice.innerText = value*price;
        // console.log(parseInt(total.innerText))
            
        total.innerText = totalValue;
        fetch(`https://book-life-bd.herokuapp.com/user-book/update-from-table/${id}`, {
            method: "POST",
            body: JSON.stringify({quantity: value, bookPrice: price}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data){
                // console.log(data);
                setUserData();
            }

        })
        .catch(err => console.log(err, setLoggedInUser, books, setBooks))
    }

    const handleDeleteBook = (id) => {
        fetch(`https://book-life-bd.herokuapp.com/delete/user-book/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data){
                setUserData();
            }
        })
    }

    let total = 0;
    for(let i=0;i<userBooks.length;i++){
        total += userBooks[i].quantity * userBooks[i].bookPrice;
    }
    return (
        <div className="container py-5">
            <h2>Checkout</h2>
            <div className="scrolling w-100 mx-auto my-3 card bg-light table-responsive">
                <div className="table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="3" className="text-muted">Description</th>
                                <th scope="col" className="text-center text-muted">Quantity</th>
                                <th scope="col" className="text-center text-muted">Action</th>
                                <th scope="col" className="text-center text-muted">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userBooks && userBooks.map(userBook => <tr key={userBook._id}>
                                    <td colSpan="3">{userBook.bookName}</td>
                                    <td className='text-center d-flex justify-content-center'><span onClick={() => handleIncreaseDecrease("-", userBook._id, userBook.bookPrice)} className="btn btn-outline-danger p-1 font-weight-bold plus-minus rounded-circle">&minus;</span> <span className="mx-1" id={userBook._id}>{userBook.quantity}</span> <span onClick={() => handleIncreaseDecrease("+", userBook._id, userBook.bookPrice)} className='btn btn-outline-success p-1 font-weight-bold plus-minus rounded-circle'> &#x2b;</span></td>
                                    <td className='text-center'><h3 onClick={() =>handleDeleteBook(userBook._id)} className='btn btn-outline-dark p-1 bg-cancel font-weight-bold rounded-circle'>&times;</h3></td>
                                    <td className='text-center'>$ <span id={userBook._id+"-price"}>{userBook.bookPrice*userBook.quantity}</span></td>
                                </tr>)
                            }
                            <tr>
                                <td colSpan="5" className="font-weight-bold">Total</td>
                                <td className="font-weight-bold text-center">$ <span id="total">{total}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex">
                <Link to="/order-proceed" className="btn btn-primary ml-auto">PLACE ORDER</Link>
            </div>
        </div>
    );
};

export default Orders;