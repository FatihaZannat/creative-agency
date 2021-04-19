import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import fakeData from '../FakeData/fakeData';
import './Home.css';
import ShowBook from '../ShowBooks/ShowBook';
import { UserContext } from '../../App';
const Home = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks] = useContext(UserContext);
    const [search, setSearch] = useState("");
    // console.log(books);
    if(false){
        console.log(loggedInUser, setLoggedInUser, userBooks, setUserBooks, allUsersBooks);
    }
    useEffect(()=>{
        // console.log(search)
        fetch(`https://book-life-bd.herokuapp.com/allBooks?search=${search}`)
        .then(res => res.json())
        .then(data => setBooks(data))
        // const newBooks = fakeData;
        // setBooks(newBooks);
    
        fetch('https://book-life-bd.herokuapp.com/all-users-books')
        .then(res => res.json())
        .then(data => setAllUsersBooks(data))
    
      }, [search]);
    const handleSearch =(evt)=>{
        evt.preventDefault();
        // console.log(evt.target.search.value)
        setSearch(evt.target.search.value);
    }
    return (
        <div className="container-fluid background-color mb-5">
            <br/>
            <form onSubmit={handleSearch} data-aos="flip-up"  data-aos-easing="ease-in-sine" data-aos-duration="1500" data-aos-offset="100" className="search d-flex mx-auto py-5">
                <input className="form-control search-bar"  type="search" placeholder="Search Book" name="search" id=""/>
                <button type="submit" className="btn btn-primary" >Search</button>
            </form>
            {
                !books.length
                && <div className="d-flex justify-content-center mt-5">
                    <CircularProgress color="secondary"/>
                 </div>
            }
            {
                books.length > 0 && <div className="container-fluid row w-100 mx-auto justify-content-center w-100">
                {
                    books.map((book, idx) => <ShowBook key={idx} idx={idx} book={book}/>)
                }
            </div>
            }
        </div>
    );
};

export default Home;