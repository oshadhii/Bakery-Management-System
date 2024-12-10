import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryForm.css';
import axios from 'axios';
import HeaderAdmin from './HeaderAdmin';

function Form() {
  const navigate = useNavigate();
  const [oDelivery, setODelivery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // To differentiate between add and update
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null); // To store the delivery ID being updated
  const [searchTerm, setSearchTerm] = useState('');

  const [newDelivery, setNewDelivery] = useState({
    vehicleid: '',
    vehicletype: '',
    vehiclenumber: '',
    driverid: '',
    drivername: '',
    driverconno: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/deliveryvehicle');
        if (response.data.success) {
          setODelivery(response.data.vehicles);
        } else {
          alert('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({
      ...newDelivery,
      [name]: value,
    });
  };

  // Handle form submission for adding a new delivery
  const handleSubmit = async () => {
    
    try {
      const response = await axios.post('http://localhost:8000/deliveryvehicle/save', {
        VehicleDriver: newDelivery,
      });
      if (response.data.success) {
        setODelivery((prevDeliveries) => [...prevDeliveries, response.data.VehicleDriver]);
        resetForm();
        alert('Success in adding new delivery');
      } else {
        alert('Failed to add new delivery');
      }
    } catch (error) {
      console.error('Error adding new delivery:', error);
      alert('There was an error');
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/deliveryvehicle/update/${selectedDeliveryId}`, {
        VehicleDriver: newDelivery,
      });
      if (response.data.success) {
        setODelivery((prevDeliveries) =>
          prevDeliveries.map((delivery) =>
            delivery._id === selectedDeliveryId ? { ...delivery, VehicleDriver: newDelivery } : delivery
          )
        );
        resetForm();
        alert('Successfully updated delivery');
      } else {
        alert('Failed to update delivery');
      }
    } catch (error) {
      console.error('Error updating delivery:', error);
      alert('There was an error');
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deliveryvehicle/delete/${id}`);
      if (response.data.success) {
        setODelivery((prevDeliveries) => prevDeliveries.filter((oDelivery) => oDelivery._id !== id));
        alert('Data deleted');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      alert('There was an error', error);
    }
  };

  // Handle the update button click
  const handleUpdateClick = (delivery) => {
    setNewDelivery({
      vehicleid: delivery.VehicleDriver.vehicleid,
      vehicletype: delivery.VehicleDriver.vehicletype,
      vehiclenumber: delivery.VehicleDriver.vehiclenumber,
      driverid: delivery.VehicleDriver.driverid,
      drivername: delivery.VehicleDriver.drivername,
      driverconno: delivery.VehicleDriver.driverconno,
    });
    setSelectedDeliveryId(delivery._id); // Store the id of the selected delivery
    setIsUpdate(true); // Mark that we are updating
    setShowForm(true); // Show the form with the existing values
  };

  // Reset form to default values after submission or cancellation
  const resetForm = () => {
    setNewDelivery({
      vehicleid: '',
      vehicletype: '',
      vehiclenumber: '',
      driverid: '',
      drivername: '',
      driverconno: '',
    });
    setIsUpdate(false);
    setSelectedDeliveryId(null);
    setShowForm(false);
  };

  // Handle search functionality
  const filteredDeliveries = oDelivery.filter((delivery) =>
    delivery?.VehicleDriver?.vehiclenumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="das-delivery-form-container">
      <HeaderAdmin />
      <br /><br />
      <h1 className='das-h1'>Fleet and Driver Management</h1>

      <div className="das-button-container1">
        <button className="das-btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="das-btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="das-btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>

      <hr  className='das-hr'/>

      <div className="das-page-container1">
        <div className="das-left-side1">
          <button className="das-newbutton" onClick={() => setShowForm(true)}>Add new Vehicle</button>
          <br></br>
          <input
            type="text"
            placeholder="Search by Vehicle Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="das-search-bar"
          />
          

          <table className="das-vehicle-tablee">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Driver Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery2) =>
                delivery2 && delivery2._id ? (
                  <tr key={delivery2._id}>
                    <td><b>{delivery2?.VehicleDriver?.vehicleid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehicletype || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehiclenumber || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.drivername || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverconno || 'N/A'}</b></td>
                    <td>
                      <button className="das-update-button" onClick={() => handleUpdateClick(delivery2)}>Update</button>
                      <br></br><br></br>
                      <button className="das-delete-button" onClick={() => handleDelete(delivery2._id)}>Delete</button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="das-form-popup">
          <div className="das-container1">
            <h2>{isUpdate ? 'Update Vehicle & Driver' : 'Vehicle Registration & Driver Allocation'}</h2>
            <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
  <label className="das-label">Vehicle ID:</label>
  <input
    type="text"
    name="vehicleid"
    className="das-input"
     pattern="^[A-Za-z0-9]+$"
  title="Driver ID must consist of numbers (1-9) and letters (A-Z, a-z)."
    value={newDelivery.vehicleid}
    onChange={handleInputChange}
    required
    readOnly={isUpdate} // Make it read-only during update
  />

  <label className="das-label">Vehicle Type:</label>
  <input
    type="text"
    name="vehicletype"
    className="das-input"
    value={newDelivery.vehicletype}
    onChange={handleInputChange}
    required
    readOnly={isUpdate} // Make it read-only during update
  />

  <label className="das-label">Vehicle Number:</label>
  <input
    type="text"
    name="vehiclenumber"
    className="das-input"
    pattern="^[A-Za-z0-9]+$"
  title="Driver ID must consist of numbers (1-9) and letters (A-Z, a-z)."
    value={newDelivery.vehiclenumber}
    onChange={handleInputChange}
    required
    readOnly={isUpdate} // Make it read-only during update
  />

  <label className="das-label">Driver ID:</label>
  <input
    type="text"
    name="driverid"
    className="das-input"
    pattern="^[A-Za-z0-9]+$"
  title="Driver ID must consist of numbers (0-9) and letters (A-Z, a-z)."
    value={newDelivery.driverid}
    onChange={handleInputChange}
    required
  />

  <label className="das-label">Driver Name:</label>
  <input
    type="text"
    name="drivername"
    className="das-input"
     pattern="^[A-Za-z0-9.-]+$"
  title="Driver Name must consist of numbers (0-9) and letters (A-Z, a-z)."
    value={newDelivery.drivername}
    onChange={handleInputChange}
    required
  />

  <label className="das-label">Driver Contact Number:</label>
  <input
    type="text"
    name="driverconno"
    className="das-input"
     pattern="^(\+947[0-9]{8}|07[0-9]{8})$"
  title="Driver contact number must be in the format: +947XXXXXXXX or 07XXXXXXXX."
    value={newDelivery.driverconno}
    onChange={handleInputChange}
    required
  />

  <button className="das-admin-button" type="submit">
    {isUpdate ? 'Update' : 'Submit'}
  </button>
  <button className="das-admin-button" type="button" onClick={resetForm}>
    Cancel
  </button>
</form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
