import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dfirst.css';
import HeaderAdmin from './HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Dfirst() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderAdmin />
      <div className="main-container">
        <br></br><br></br><br></br><br></br>
        <h2 className="highlight">Welcome to Delivery Management</h2>
        <div className="das-delivery-management-page">
          
          <div className="das-content-box">
            <h2>  Miyurasa Delivery</h2>
            <p>
              Welcome to the Delivery Management System admin panel. Here you can oversee and manage various aspects of your delivery operations. This includes managing your vehicles, handling order deliveries, and keeping track of daily delivery stocks. Use the navigation buttons below to access different sections of the system.
            </p>
            <p>As the administrator of the Delivery Management System, you play a crucial role in ensuring smooth operations. Your responsibilities include overseeing vehicle management, optimizing order processing, and maintaining accurate records of daily deliveries. </p>
            <div className="das-button-container">
              <button className="das-nav-button" onClick={() => navigate('/Form')}>
                Manage Vehicles
              </button>
              <button className="das-nav-button" onClick={() => navigate('/orderdelivery')}>
                Order Delivery
              </button>
              <button className="das-nav-button" onClick={() => navigate('/dailyroute')}>
                Daily Delivery Stocks
              </button>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default Dfirst;
