
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.css';
import Bakerylogo from './images/logo.png';

function Header(){
  const navigate = useNavigate ();
  const Homepage = useNavigate ();
  const CommercialOrder = useNavigate();
  const AdminDashboard = useNavigate();
  
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
                        <li ><a href="#home" class="dropbtn">Place Order</a>
                        <ul className = "dropdown">
                            <li onClick={ ()=> CommercialOrder('/commercial')}><a href="#"><i></i>Wholsale Odering</a></li>
                            <li onClick={ ()=> navigate ('/Online')}><a href="#"><i></i>Online Ordering</a></li>
                          </ul>
                        </li>
                        {/* <li><a href="#home">Sign Up</a></li> */}
                        <li ><a href="#home">Login</a></li>
                        <li onClick={ ()=> AdminDashboard('/AdminDashbrd')}><a href="#admin">Admin</a></li>
                     
                       </ul> 
                        
                        
                    </div>
                </div>
             </div>
           
        </header>
        </>
    );

 
 

}

export default Header;