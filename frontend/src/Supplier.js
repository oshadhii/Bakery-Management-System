import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Supplier.css';
import supplierImage from './images/supplier.jpg';
import supplierImage1 from './images/supplier1.jpg';
import orderImage from './images/order.jpg';

function SupplierUI(){
    const navigate = useNavigate();
    return(
  <>
    <header>
    </header>

    <div className='supplier'>
      <div className='suppliertop-area'>
        <div className= 'suppliertopic'>
          <p><b>Supplier<br/>
          Management<br/>
          System</b></p>
        </div>
        <div className='suppliertop-image'>
          <img className = 'suppliertop-image' src={supplierImage} alt="Supplier" />
        </div>
      </div>

      <div className='supplierimg'>

        <div className='supplierpurpose'>
          <h2>Our Supplier Management System</h2>
          <p>A Supplier Management System for a bakery management system streamlines the procurement process, ensuring a seamless supply of high-quality ingredients and materials.</p>
          <p>It enables efficient tracking of supplier performance, automates order placements, and monitors inventory levels. </p>
          <p>By integrating supplier management into the bakery's operations, the system helps maintain optimal stock levels, reduces waste, and ensures timely deliveries, ultimately contributing to consistent product quality and operational efficiency.</p>
        </div>

        <div className= "supplierbody">

          <div className = 'supplier-btn'>
            <img className='supplier-img' src={supplierImage1} alt="supplier1"/>
            <h2 align='center'>Supplier Details</h2>
            <button onClick={() => navigate('/View')}>Click here</button>
          </div>

          <div className = 'supplier-btn'>
            <img className='supplier-img' src={orderImage} alt="order"/>
            <h2 align='center'>Orders</h2>
            <button onClick={() => navigate('/OrderView')}>Click here</button>
          </div>
        
        </div>

      </div>

    </div>  
  </>
  );
}

export default SupplierUI;