
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyRoutes.css';
import { useEffect } from "react";
import axios from 'axios';
import HeaderAdmin from './HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
function DailyRoutes() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);//new new
  //----------new new vehicles read wena code eka---------
 useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/deliveryvehicle');
        if (response.data.success) {
          setVehicles(response.data.vehicles);
        } else {
          alert('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
  
    fetchVehicles();
  }, []);
  



//--new new iwriii------------------

  // State for the entire form data
  const [newrouteDelivery, setnewrouteDelivery] = useState({
    date: '',
    vehicleno: '',
    drivername: '',
    products: [{ product: '', quantity: '', unitprice: '', totalprice: '' }],
  });

  const [products, setProducts] = useState([{ product: '', quantity: '', unitprice: '', totalprice: '' }]);

  // Handle product input change
  const handleChange = (index, e) => {
    const newProducts = [...products];
    const { name, value } = e.target;

    newProducts[index][name] = value;

    // Set unit price based on product type
    if (name === 'product') {
      let unitPriceValue = 0;
      switch (value) {
        case 'Sausage Bun':
          unitPriceValue = 80;
          break;
        case 'Egg Bun':
          unitPriceValue = 80;
          break;
        case 'Fish Bun':
          unitPriceValue = 60;
          break;
        case 'Chicken Bun':
          unitPriceValue = 100;
          break;
        case 'Cheese Bun':
          unitPriceValue = 150;
          break;
          
        default:
          unitPriceValue = 0;
      }
      newProducts[index].unitprice = unitPriceValue;
    }

    // Calculate total price
    if (name === 'quantity' || name === 'unitprice' || name === 'product') {
      const quantity = parseFloat(newProducts[index].quantity) || 0;
      const unitprice = parseFloat(newProducts[index].unitprice) || 0;
      newProducts[index].totalprice = quantity * unitprice;
    }

    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts }); // Update main state
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewrouteDelivery({ ...newrouteDelivery, [name]: value });
  };

  // Add new product row
  const addProductRow = () => {
    setProducts([...products, { product: '', quantity: '', unitprice: '', totalprice: '' }]);
  };

  // Remove product row
  const removeProductRow = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts }); // Update main state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!newrouteDelivery.date || !newrouteDelivery.vehicleno || !newrouteDelivery.drivername) {
      alert('Please fill all the required fields.');
      return;
    }

    
    console.log('Submitting data:', newrouteDelivery);

    // create
    axios
      .post('http://localhost:8000/deliverysales/save', { dailydelivery: newrouteDelivery })
      .then((response) => {
        if (response.data.success) {
          alert('New delivery added successfully!');
          // Clear form after successful submission
          setnewrouteDelivery({
            date: '',
            vehicleno: '',
            drivername: '',
            products: [{ product: '', quantity: '', unitprice: '', totalprice: '' }],
          });
          setProducts([{ product: '', quantity: '', unitprice: '', totalprice: '' }]);
        } else {
          alert('Failed to add new delivery');
        }
      })
      .catch((error) => {
        console.error('There was an error:', error.response ? error.response.data.error : error.message);
        alert(`There was an error: ${error.response ? error.response.data.error : error.message}`);
      });
  };

  return (
    <div className="das-admin-form-container">
      <HeaderAdmin/>
      <br></br>
      <div className="das-button-container1">
        <button className="das-btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="das-btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="das-btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>

      <h1 className='das-h1'>Daily Delivery Stock Management</h1><br />
      <button className="das-dassales" onClick={() => navigate('/ViewDailySales')}>+ View Daily Sales</button>
      <br></br> 
      <div className="das-admin-page-container">
        <div className="das-admin-right-side">
        
          <div className="das-admin-container">
            <h2>New Daily Delivery Stocks</h2>
            <form onSubmit={handleSubmit}>
              <div className="das-admin-form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newrouteDelivery.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="das-admin-form-group">
                <label htmlFor="vehicleno">Vehicle ID:</label>
                <select
                  type="text"
                  id="vehicleno"
                  name="vehicleno"
                  value={newrouteDelivery.vehicleno}
                  onChange={handleInputChange}
                  required
                >
                   <option value="" disabled>Select a vehicle</option>
    {vehicles.map((vehicle) => (
      <option key={vehicle._id} value={`${vehicle.VehicleDriver.vehicleid} - ${vehicle.VehicleDriver.vehicletype}`}>
        {vehicle.VehicleDriver.vehicleid} - {vehicle.VehicleDriver. vehicletype} 
      </option>
    ))} 
                 
              </select>
              </div>

              <div className="das-admin-form-group">
                <label htmlFor="drivername">Driver Name:</label>
                <select
                  type="text"
                  id="drivername"
                  name="drivername"
                  value={newrouteDelivery.drivername}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select a Driver</option>
            {vehicles.map((vehicle) => (
      <option key={vehicle._id} value={`${vehicle.VehicleDriver.driverid} - ${vehicle.VehicleDriver.drivername}`}>
        {vehicle.VehicleDriver.driverid} - {vehicle.VehicleDriver. drivername} 
      </option>
    ))} 
                
              </select>
                
              </div>

              <h3>Daily Stock Management</h3>
              <div className="das-stock-management-container">
                {products.map((product, index) => (
                  <div key={index} className="das-admin-product-row">
                    <div className="das-admin-form-group">
                      <label htmlFor={`product-${index}`}>Product:</label>
                      <select
                        id={`product-${index}`}
                        name="product"
                        value={product.product}
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="" disabled>Select Product</option>
                        <option value="Sausage Bun">Sausage Bun</option>
                        <option value="Egg Bun">Egg Bun</option>
                        <option value="Fish Bun">Fish Bun</option>
                        <option value="Chicken Bun">Chicken Bun</option>
                        <option value="Cheese Bun">Cheese Bun</option>
                      </select>
                    </div>

                    <div className="das-admin-form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleChange(index, e)}
                        min="0"
                        max="100"
                        required
                      />
                    </div>

                    <div className="das-admin-form-group">
                      <label htmlFor={`unitprice-${index}`}>Unit Price:</label>
                      <input
                        type="number"
                        id={`unitprice-${index}`}
                        name="unitprice"
                        value={product.unitprice}
                        readOnly
                      />
                    </div>

                    <div className="das-admin-form-group">
                      <label>Total Price:</label>
                      <input
                        type="number"
                        value={product.totalprice}
                        readOnly
                      />
                    </div>

                    <div className="das-admin-product-actions-container">
                      <div className="das-admin-product-actions1">
                        <button type="button" onClick={addProductRow}>Add</button>
                      </div>
                      <div className="das-admin-product-actions2">
                        <button type="button" onClick={() => removeProductRow(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="das-admin-button" type="submit">Submit</button>
            </form>
            


          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DailyRoutes;
