import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddBook from './AddBook';
import './Admin.css';
import ManageBooks from './ManageBooks';
import manage from '../../images/icons/grid 1.png';
import plus from '../../images/icons/plus 1.png';
import edit from '../../images/icons/edit 1.png';
const Admin = () => {
    const [adminWork, setAdminWork] = useState("add-book");
    const [add_book, setAddBook] = useState('active');
    const [manage_books, setManageBook] = useState("");
    const [edit_book, setEditBook] = useState("");
    const handleAdminWork = (work) =>{
        // console.log(work);
        if(work==="add-book"){
            setAddBook('active');
            setManageBook("");
            setEditBook("");
        }
        else if(work === 'manage-books'){
            setAddBook('');
            setManageBook("active");
            setEditBook("");
        }
        else if(work=== 'edit-book'){
            setAddBook('');
            setManageBook("");
            setEditBook("active");
        }
        setAdminWork(work);
    }
    return (
        <div className="row w-100 mx-auto">
            <div style={{background: "#19103F"}} className="col-md-3 text-light text-justify mx-auto py-3">
                <div className="w-100 mx-auto">
                    <Link to='/' className='text-decoration-none text-light  font-weight-bold my-4 text-center py-2 '><h4>BOOK SHOP</h4></Link>
                    <br/>
                    <p className={`w-100 py-2 text-center hover ${manage_books}`} onClick={() =>handleAdminWork("manage-books")} style={{cursor: 'pointer'}}><img src={manage} style={{ height: '25px'}} alt=''></img> Manage Books</p>
                    <p className={`w-100 py-2 text-center hover ${add_book}`} onClick={() =>handleAdminWork("add-book")} style={{cursor: 'pointer'}}><img src={plus} style={{ height: '25px'}} alt=''></img> Add Book</p>
                    <p onClick={()=> handleAdminWork(`${adminWork}`)} className={`w-100 py-2 text-center hover ${edit_book}`} style={{cursor: 'pointer'}}><img src={edit} style={{ height: '25px'}} alt=""></img> Edit Book</p>
                </div>
            </div>
            <div className="col-md-9 p-0 m-0">
                {
                    adminWork === 'add-book' 
                    ? <AddBook/>
                    : <ManageBooks/>
                }
                {/* {
                    adminWork === 'manage-books' && <ManageBooks/>
                } */}
            </div>
        </div>
    );
};

export default Admin;