import React from 'react';
import { useParams } from 'react-router';
import notFound from '../../images/icons/notFound.gif';
const NotFound = () => {
    const {page} = useParams();
    // console.log(page);
    return (
        <div style={{minHeight: "100vh"}} className='text-warning my-0 bg-dark text-center'>
            <h2 style={{position:'relative', top: '50px'}}>Sorry!!! The (<span className="text-danger">{page}</span>) page is not Found-404</h2>
            <img className='img-fluid my-5' style={{height: '524px'}} src={notFound} alt=""/>
            <p className='text-light' style={{position:'relative', bottom: '50px'}}>Inshallah!!! The (<span className="text-success my-0" >{page}</span>) page is coming soon...</p>
        </div>
    );
};

export default NotFound;