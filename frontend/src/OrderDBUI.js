import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderDBUI.css'; // Create this CSS file
import HeaderAdmin from './HeaderAdmin'; // Ensure correct import
import ordermanage from './images/ordermanage2.jpg'; // Ensure correct path

const OrderDBUI = () => {
  const navigate = useNavigate();

  const handleOnlineOrderClick = () => {
    navigate('/onlineOrderDashbrd'); // Adjust the route as per your routing setup
  };

  const handleWholesaleOrderClick = () => {
    navigate('/orderDashbrd'); // Adjust the route as per your routing setup
  };

  return (
    <div className="order-dashboard">
      <HeaderAdmin/>

      <h1 className="order-dashboard-heading">Order Dashboard</h1>
      
      <div className="order-dashboard-image-container">
        <img 
          src={ordermanage}
          alt="Dashboard"
          className="order-dashboard-image"
        />
      </div>
    <div className="order-dashbpoard-content">
      <p className="order-dashboard-description">
        Welcome to the Order Dashboard! Here, you can manage and track all your online and wholesale orders efficiently. Choose an option below to get started.
      </p>

      <div className="order-dashboard-button-container">
        <button onClick={handleOnlineOrderClick} className="order-dashboard-button">
          Online Order Dashboard
        </button>
        <button onClick={handleWholesaleOrderClick} className="order-dashboard-button">
          Wholesale Order Dashboard
        </button>
      </div>
</div>
      
    </div>
  );
};

export default OrderDBUI;
