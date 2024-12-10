import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './OrderDelivery.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // for Chart.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable'; // For generating tables in PDF
import HeaderAdmin from './HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function OrderDelivery() {
  //declare the usestates and usernavigtion
  const navigate = useNavigate();
  const [addDelivery, setAddDelivery] = useState(false);
  const [itemId, setItemId] = useState('');
  const [addStatus, setAddStatus] = useState('');
  const [oDelivery, setODelivery] = useState([]);
  const [vehicles, setVehicles] = useState([]);//new new

  const [newDelivery, setNewDelivery] = useState({
    orderid: '',
    orderlocation: '',
    ordertype:'',
    assigneddriver: '',
    diliveryvehicle: '',
    diliverydate: '',
    diliverystatus: '',
  });
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
//search function-------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [searchTerm3, setSearchTerm3] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchChange2 = (e) => {
    setSearchTerm2(e.target.value);
  };
  const handleSearchChange3 = (e) => {
    setSearchTerm3(e.target.value);
  };

  const filteredOrders = oDelivery.filter((delivery) =>
  { const x= delivery.OrderDelivery?.orderid.toLowerCase().includes(searchTerm.toLowerCase());
    const y= delivery.OrderDelivery?.orderlocation.toLowerCase().includes(searchTerm2.toLowerCase());
    const z= delivery.OrderDelivery?.diliverydate.toLowerCase().includes(searchTerm3.toLowerCase());
   return x && y && z
  }
  );
  //search iwriiiii-------------------------
//input chnage 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };
 
//read eka-------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/deliveryorder/save', { OrderDelivery: newDelivery })
      .then(response => {
        if (response.data.success) {
          setODelivery([...oDelivery, response.data.orderDelivery]);
          setNewDelivery({ orderid: '', orderlocation: '', ordertype:'',assigneddriver: '', diliveryvehicle: '', diliverydate: '', diliverystatus: '' });
          alert('success to add new delivery');
        } else {
          alert('Failed to add new delivery');
        }
      })
      .catch(error => {
        alert('There was an error', error);
      });
  };
//create eka-------------------------------------------------
  useEffect(() => {
    axios.get('http://localhost:8000/deliveryorder')
      .then(response => {
        if (response.data.success) {
          setODelivery(response.data.mypost);
        } else {
          alert('Unsuccessful');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts', error);
      });
  }, []);
//update eka------------------------------------
  const handleUpdate = (itemId) => {
    axios.put(`http://localhost:8000/deliveryorder/update/${itemId}`, { diliverystatus: addStatus })
      .then(response => {
        if (response.data.success) {
          setODelivery(oDelivery.map(ex =>
            ex._id === itemId ? { ...ex, OrderDelivery: { ...ex.OrderDelivery, diliverystatus: addStatus } } : ex
          ));
          alert('Data updated successfully');
        } else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
        alert('Error occurred');
      });
  };
//delete ka---------------------
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/deliveryorder/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setODelivery(oDelivery.filter(oDelivery => oDelivery._id !== id));
          alert('Data deleted');
        } else {
          alert('Failed to delete');
        }
      })
      .catch(error => {
        alert('There was an error', error);
      });
  };
  //delete eka iwri--------------------------------
  const [showForm, setShowForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDate, setSelectedDate] = useState(''); // Added state for date selection

  const formAnimation = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  });
 
  //pie chart starts------------------------------------
  // Function to extract the last part of the address (location)
const getLocationFromAddress = (address) => {
  const parts = address.split(',');
  return parts[parts.length - 1].trim(); // Get the last part and trim any extra spaces
};

// Function to get order data for a specific date and group by location
const getOrderDataForDate = (date) => {
  const filteredOrdersByDate = oDelivery.filter(
    (order) => order.OrderDelivery?.diliverydate === date
  );  
const locationCounts = {};

  filteredOrdersByDate.forEach((order) => {
    // Get the full address
    const fullAddress = order.OrderDelivery?.orderlocation || 'Unknown';
    
    // Extract the location (last part of the address)
    const location = getLocationFromAddress(fullAddress);
    
    // Group by location
    if (locationCounts[location]) {
      locationCounts[location] += 1;
    } else {
      locationCounts[location] = 1;
    }
  });

  return locationCounts;
};

// Pie chart data using the sorted location counts
const pieData = {
  labels: Object.keys(getOrderDataForDate(selectedDate)), // Locations as labels
  datasets: [
    {
      label: 'Orders by Location',
      data: Object.values(getOrderDataForDate(selectedDate)), // Order counts for each location
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FFA726'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FFA726'],
    },
  ],
};
//-----------------pie chart done--------------------------------
//showing and closing forms
  const handleNewOrderClick = () => {
    setShowForm(!showForm);
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleUpdateClick = (id) => {
    setItemId(id);
    setAddDelivery(true);
  };

  const closeModal = () => {
    setAddDelivery(false);
  };
  
 

  

  
//report make and generate pdf------------------------------
const handleGenerateReport = () => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(18);
  doc.text('Delivery Report', 14, 22);
  doc.text('Generate Date : ${currentDate}' , 14, 24);

  const filteredOrdersByDate = oDelivery.filter(
    (order) => order.OrderDelivery?.diliverydate === selectedDate
  );

  if (filteredOrdersByDate.length === 0) {
    doc.text(`No deliveries found for the selected date: ${selectedDate}`, 14, 40);
  } else {
    const tableData = filteredOrdersByDate.map((order) => [
      order.OrderDelivery?.orderid,
      order.OrderDelivery?.orderlocation,
      order.OrderDelivery?.ordertype,
      order.OrderDelivery?.assigneddriver,
      order.OrderDelivery?.diliveryvehicle,
      order.OrderDelivery?.diliverystatus,
    ]);

    doc.autoTable({
      head: [['Order ID', 'Location','type', 'Driver', 'Vehicle', 'Status']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      //headStyles: { fillColor: [0, 153, 255] },  background color
      //styles: { 
       // fillColor: [255, 255, 255], // Rowcolor
        //textColor: [0, 0, 0], // Textcolor

    });
  }

  doc.save(`Delivery_Report_${selectedDate}.pdf`);
};
//-----------------------------------------------------------


  return (
    <div>
      <HeaderAdmin/>
      <br></br><br></br><br></br>
      <h1 className='das-h1'>Manage Delivery Executive</h1>
      <div className="das-button-container1">
        <button className="das-btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="das-btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="das-btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>
  <hr/>
      
  
      <div className="das-search-container">
        <input type="text" placeholder="Search by Order ID" className="das-search-input" value={searchTerm} 
          onChange={handleSearchChange}  />
          
          <input type="text" placeholder="Search by Location" className="das-search-input" value={searchTerm2} 
          onChange={handleSearchChange2}  />

<input type="text" placeholder="Search by Delivery Date" className="das-search-input" value={searchTerm3} 
          onChange={handleSearchChange3}  />
          
        <i className="das-fas fa-search search-icon"></i>
      </div>
      

      <div className="das-orders-container2">
      <button className="das-new-order-button" onClick={handleNewOrderClick}>
          <span className="das-plus-icon">+</span>
          {showForm ? 'Hide New Order Form' : 'Place New Order Delivery'}
        </button>
        <br />
        <button className="das-summary-button" onClick={handleShowSummary}>
          View  Delivery Summary
        </button>
       
        <table className="das-orders-table2">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Location</th>
              <th>Order type</th>
              <th>Assigned Driver</th>
              <th>Delivery Vehicle</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((delivery) => (
              <tr key={delivery._id}>
                <td><b>{delivery.OrderDelivery?.orderid}</b></td>
                <td><b>{delivery.OrderDelivery?.orderlocation}</b></td>
                <td><b>{delivery.OrderDelivery?.ordertype}</b></td>
                <td><b>{delivery.OrderDelivery?.assigneddriver}</b></td>
                <td><b>{delivery.OrderDelivery?.diliveryvehicle}</b></td>
                <td><b>{delivery.OrderDelivery?.diliverydate}</b></td>
                <td><b>{delivery.OrderDelivery?.diliverystatus}</b></td>
                <td>
                  <button className="das-update-button" onClick={() => handleUpdateClick(delivery._id)}>Update</button><br /><br />
                  <button className="das-delete-button" onClick={() => handleDelete(delivery._id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>

      <animated.div style={formAnimation} className="das-form-popup2">
        <form className="das-form2" onSubmit={handleSubmit}>
          <h1 className='das-h1'>New Order Delivery</h1>
          <div className="das-form-group2">
            <label htmlFor="das-orderId">Order ID:</label>
            <input type="text" id="orderId" name="orderid" value={newDelivery.orderid} onChange={handleInputChange}pattern="[A-Za-z0-9]+" title="Please enter numbers only" required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="orderLocation">Order Location:</label>
            <input type="text" id="orderLocation" name="orderlocation" value={newDelivery.orderlocation} onChange={handleInputChange} minlength="5"  pattern="[a-zA-Z0-9\s,.-]{10,200}"   required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="ordertype">Order Type:</label>
            <select id="ordertype" name="ordertype" value={newDelivery.ordertype} onChange={handleInputChange} minlength="5"    required >
            <option value="" disabled>Select order size</option>
              <option value="Bulk order">Bulk order</option>
              <option value="Online order -small">Online order -small</option>
              <option value="Online order-large">Online order-large</option>
              </select>
              
          </div>
          <div className="das-form-group2">
            <label htmlFor="assignedDriver">Assigned Driver:</label>
            <select id="assignedDriver" name="assigneddriver" value={newDelivery.assigneddriver} onChange={handleInputChange} required >
           <option value="" disabled>Select a Driver</option>
            {vehicles.map((vehicle) => (
      <option key={vehicle._id} value={`${vehicle.VehicleDriver.driverid} - ${vehicle.VehicleDriver.drivername}`}>
        {vehicle.VehicleDriver.driverid} - {vehicle.VehicleDriver. drivername} 
      </option>
    ))} </select>
          </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryVehicle">Delivery Vehicle:</label>
            <select  id="deliveryVehicle" name="diliveryvehicle" value={newDelivery.diliveryvehicle} onChange={handleInputChange} required>
             <option value="" disabled>Select a vehicle</option>
    {vehicles.map((vehicle) => (
      <option key={vehicle._id} value={`${vehicle.VehicleDriver.vehicleid} - ${vehicle.VehicleDriver.vehicletype}`}>
        {vehicle.VehicleDriver.vehicleid} - {vehicle.VehicleDriver. vehicletype} 
      </option>
    ))} 
  </select>
   </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input type="date" id="deliveryDate" name="diliverydate" value={newDelivery.diliverydate} onChange={handleInputChange} required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryStatus">Delivery Status:</label>
            <select id="deliveryStatus" name="diliverystatus" value={newDelivery.diliverystatus} onChange={handleInputChange} required>
            <option value="" disabled>Select Status</option>
              <option value="pending">Pending</option>
              <option value="inTransit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <button className="das-das-submit-button" type="submit">Submit</button>
        </form>
      </animated.div>
      
      {addDelivery && (
        <div className="das-modal-overlay">
          <div className="das-modal-content">
            <form onSubmit={() => handleUpdate(itemId)}>
              <div className="das-form-group2">
                <label htmlFor="status">Update Delivery Status:</label>
                <select
                  type="text"
                  id="status"
                  name="status"
                  value={addStatus}
                  onChange={(e) => setAddStatus(e.target.value)}
                >
                   <option value="" disabled>Change Status</option>
              <option value="pending">Pending</option>
              <option value="inTransit">In Transit</option>
              <option value="delivered">Delivered</option>
                  </select>
              </div>
              <button type="submit" className="das-btn">Update</button>
              <button type="button" className="das-btn" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="das-order-summary-modal">
          <div className="das-order-summary-content">
            <h2 className='das-h2'>Delivery Summary per day</h2>
            <label htmlFor="selectDate">Select Date:</label>
            <input
            
              type="date"
              id="selectDate"
              className="das-sort-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Pie data={pieData} width={200} height={200} />
            <div className="das-bt-con">
            <button className="das-generate-report-button" onClick={handleGenerateReport}>
             Generate Report
             </button>
            <button className="das-close-summary-button" onClick={handleCloseSummary}>
              Close Summary
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDelivery;

