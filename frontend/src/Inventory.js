import { useNavigate } from 'react-router-dom';
import './Inventory.css'
import Reports from './images/reports.jpg';
import Inventory from './images/inventory.jpg';
import MainImg from './images/top-image.jpg';
import Header from './Header.js';


function InventoryUI(){

  const Navigate = useNavigate();

  return(

  <>
  <div className='inventory'>
  <Header/>
    <div className='top-area'>
      <div className= 'topic'>
        <p>Inventory<br/>
        Management<br/>
        System</p>
      </div>
      <div className='top-image'>
        <img className = 'top-image' src={MainImg} alt=''/>
      </div>

    </div>

    <div className='inventorypurpose'>
      <h2>Our Inventory Management System</h2><p>streamlines the process of 
        tracking and managing your inventory efficiently. Designed 
        to provide real-time updates and detailed insights, our 
        system helps businesses maintain optimal stock levels, 
        minimize wastage, and ensure timely replenishments.
      </p>

      <h3>"Optimize your inventory, maximize your efficiency."</h3>
    </div>

  <div className= "inventory-body">

    <div className = 'reports-btn'>
      <img className='report-img' src = {Reports} alt=""/>
      <h2 align='center'>Check Stock reports</h2>
      <button className='report-btn' onClick={() => Navigate('/dashboard/generatereport')}>Click here</button>
    </div>

    <div className = 'dashboard-btn'>
      <img className='invent-img' src = {Inventory} alt=""/>
      <h2 align='center'>Go to Inventory Dashboard</h2>
      <button className='invent-btn' onClick={() => Navigate('/dashboard')}>Click here</button>

    </div>

  </div>

  <br/><br/><br/><br/>

  </div>

  </>
);
}

export default InventoryUI;