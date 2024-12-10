import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerUI.css';

function CustomerUI(){
    const navigate = useNavigate();
    return(
    <>
        <header>
        </header>
    <div class="customercontainer">
        <div class="customerc-m-s">
            <h2><b>Customer Management System</b></h2>
            <div class="customerimg">
            </div>
            <div class="customerp">
                <p>A Customer Management System for a bakery management system helps track customer interactions, manage orders, and maintain customer satisfaction.</p>
                <p>It enables efficient handling of customer data, automates communication, and personalizes services.</p>
                <p>By integrating customer management into the bakery's operations, the system ensures timely responses, fosters customer loyalty, and drives sales growth.</p>
            </div>
            <div className= "Customerbody">
                <div className = 'Customer-btn'>
                    <h3 align='center'>Customer Details</h3>
                    <button onClick={() => navigate('/CustomerView')}>Click here</button>
                </div>
                <div className = 'Customer-btn'>
                    <h3 align='center'>Customer Inquiry</h3>
                    <button onClick={() => navigate('/AdminInquiryView')}>Click here</button>
                </div>
            </div>
        </div>
    </div>

    </>
  );
}

export default CustomerUI;