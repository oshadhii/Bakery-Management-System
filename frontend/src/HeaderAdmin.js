import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.css';

function HeaderAdmin(){
    const navigate = useNavigate ();
    const Homepage = useNavigate ();

    const AdminDashbrd= useNavigate();
    
      return(
  <>
   
   <header>
   <div className="nav-bar">
                <h2 className="logo">Miyurasa Bakers</h2>
                {/*<img src={Bakerylogo}/>*/}
                <div className="nav-item">
                    <div className="nav-items">
                       <ul>
                        <li onClick={ ()=> Homepage ('/')}><a href= "#home">Home</a></li>
                        {/* <li><a href="#home">Sign Up</a></li> */}
                        <li><a href="#home">Login</a></li>
                        <li onClick={ ()=> AdminDashbrd('/AdminDashbrd')}><a href="#home">Admin</a></li>
                     
                       </ul> 
                        
                        
                    </div>
                </div>
             </div>
           
        </header>
        </>
    );

 
 

}

export default HeaderAdmin;