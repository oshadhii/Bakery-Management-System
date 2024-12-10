import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import HeaderAdmin from './HeaderAdmin';



const AdminDashboard = () => {
    return (
        
      <div className="admin-dashboard-page">

        <HeaderAdmin/>
        <header className="admin-dashboard-page-header">
          <h1>Bakery Management System - Admin Dashboard</h1>
        </header>
  
        <div className="admin-dashboard-page-grid">
          <Link to="/ProductLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Product & Wastage</h2>
              <p>Manage bakery products, track wastage.</p>
            </div>
          </Link>
  
          <Link to="/SupplierLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Supplier Management</h2>
              <p>Track and manage suppliers.</p>
            </div>
          </Link>
  
          <Link to="/inventorylogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Inventory Management</h2>
              <p>Monitor stock levels and inventory.</p>
            </div>
          </Link>
  
          <Link to="/OrderLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Order Management</h2>
              <p>Handle customer orders and processes.</p>
            </div>
          </Link>
  
          <Link to="/CustomerLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Customer Management</h2>
              <p>View and manage customer information.</p>
            </div>
          </Link>
  
          <Link to="/DeliveryLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Delivery Management</h2>
              <p>Track delivery status and logistics.</p>
            </div>
          </Link>
  
          <Link to="/SalesLogin" className="admin-dashboard-page-card">

            <div className="admin-dashboard-page-card-content">
              <h2>Sales Reports</h2>
              <p>View and analyze sales data.</p>
            </div>
          </Link>
  
          <Link to="/EmployeeLogin" className="admin-dashboard-page-card">
            <div className="admin-dashboard-page-card-content">
              <h2>Employee Management</h2>
              <p>Manage employee details and schedules.</p>
            </div>
          </Link>
        </div>
  
        <footer>
        <div className="Admain_footer">

            <div className="Adfooter_tag">
                <h2>Location</h2>
                <p>No 123,</p>
                <p>Sadasarana Mawatha</p>
                <p>Rilaulla</p>
                <p>Kandana</p>
            
            </div>
            <div className="Adfooter_tag">
                <h2>Contact Us</h2>
                <p>011-2345678</p>
                <p>071-2345678</p>
                <p>miyurasaBakers@gmail.com</p>
        
            </div>
            
            <div className="Adfooter_tag">
                <h2>Our Service</h2>
                <p>Fast Delivery</p>
                <p>Easy Payments</p>
                <p>24 x 7 Service</p>
            </div>

            <div className="Adfooter_tag">
                <h2>Follow Us</h2>
                
                        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
    
            </div>
            

        </div>

        
    </footer>
      </div>
    );
  };


  
  export default AdminDashboard;

  