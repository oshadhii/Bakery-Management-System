
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'; //frontend connect
import  "./OrderDashboard.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import icon from './images/notifyicon.png';

function OrderDashboard() {
  

  const[orders,setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
 const [temporaryStatus, setTemporaryStatus] = useState('');
 const [searchQuery, setSearchQuery] = useState('');
 const [notifications, setNotifications] = useState([]);
 const [showNotifications, setShowNotifications] = useState(false); // State to control visibility
 const [unreadNotifications, setUnreadNotifications] = useState([]);
 const [unreadCount, setUnreadCount] = useState(0);



 useEffect(() => {
  const storedNotifications = JSON.parse(sessionStorage.getItem('notifications')) || [];
  const storedUnreadNotifications = JSON.parse(sessionStorage.getItem('unreadNotifications')) || [];

  
  setNotifications(storedNotifications);
  setUnreadNotifications(storedUnreadNotifications);
  setUnreadCount(storedUnreadNotifications.length); // Count of unread notifications

}, []);


const handleIconClick = () => {
  setShowNotifications(prev => !prev); // Toggle notifications

  // If notifications are now being shown, mark them as read
    if (!showNotifications && unreadCount > 0) {
    // Mark all notifications as read
     setUnreadNotifications([]);
     setUnreadCount(0);

      sessionStorage.setItem('unreadNotifications', JSON.stringify([])); // Update sessionStorage
    }
};



 // Function to delete a notification
const deleteNotification = (indexToDelete) => {
  const updatedNotifications = notifications.filter((_, index) => index !== indexToDelete);

      // Update state and sessionStorage
      setNotifications(updatedNotifications);
      sessionStorage.setItem('notifications', JSON.stringify(updatedNotifications));
            // Update notifications and unread notifications
          // const updatedUnreadNotifications = updatedNotifications.filter((notification) =>
          //   unreadNotifications.includes(notification)
          // );
};

  useEffect(() =>{
      axios.get('http://localhost:8000/wholesaleOrder')
      .then(response =>{
        if(response.data.success){
          setOrders(response.data.ReadData);

        }else{
          alert("No data added");
        }
      })

      .catch(error =>{
        alert('There is a error feching data', error);
      });
  }, []);


  const updateOrderStatus = (orderId, newStatus) => {
    axios.put(`http://localhost:8000/wholesaleOrder/update/${orderId}`, { status: newStatus })
      .then(response => {
        if (response.data.success) {
          // Update the local state with the new data
          setOrders(orders.map(order => 
            order._id === orderId ? { ...order, WholesaleOrder: { ...order.WholesaleOrder, status: newStatus } } : order
          ));
         
        } else {
          alert("Failed to update status");
        }
      })
      .catch(error => {
        alert('There was an error updating the status', error);
      });
  };

  const handleUpdateClick = (orderId) => {
    setEditingOrderId(orderId); // Set the editing order ID to show the dropdown
  };

  const handleCancelClick = () => {
    setEditingOrderId(null); // Hide the dropdown without making any changes
  };
  const handleStatusChange = (e) => {
    setTemporaryStatus(e.target.value);
  };
  const handleDelete = (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8000/wholesaleOrder/delete/${id}`)
        .then(response => {
          if (response.data.success) {
            // Corrected the filter condition to exclude the deleted order
            setOrders(orders.filter(order => order._id !== id));
            alert("Data deleted successfully");
          } else {
            alert("Failed to delete the order");
          }
        })
        .catch(error => {
          console.error('There was an error deleting the item', error);
          alert('There was an error deleting the order');
        });
    }
    // If the user clicked Cancel, do nothing
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle undefined or null dates
    const date = new Date(dateString);
    
    // Check for invalid dates
    if (isNaN(date.getTime())) {
      return dateString; // Return the original string if invalid
    }
    
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-indexed
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}.${month}.${day}`;
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order => 
    order.WholesaleOrder.customerID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.WholesaleOrder.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(order.WholesaleOrder.createdAt).includes(searchQuery)
  );



  
  // Inside your OrderDashboard component
  const generateReport = () => {

    const ordersToReport = filteredOrders.length > 0 ? filteredOrders : orders; // Use filteredOrders if available

    if (ordersToReport.length === 0) {
      alert('No orders available to generate a report.');
      return;
    }
  
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString(); // e.g., 09/23/2024
  
    // Add the bakery name and current date
    doc.setFontSize(16);
  doc.text('Miyurasa Bakers - Monthly Wholesale Order Report', 45, 23);
  doc.setFontSize(12);
  doc.text(`Report Generated: ${currentDate}`, 14, 37);
  doc.text(`Month: Oct 2024`, 14, 32);
  doc.text(`Report By: Order Manager - Malmi Bandara`, 14, 42);
  
    // Define multi-level table headers
    const headers = [
      [
        { content: 'Customer ID', rowSpan: 2 },
        { content: 'Customer Name', rowSpan: 2 },
        { content: '                       Products', colSpan: 5 },
        { content: 'Total Amount', rowSpan: 2 },
        { content: 'Order Schedule', rowSpan: 2 },
        { content: 'Delivery Date', rowSpan: 2 },
        { content: 'Order Date', rowSpan: 2 },
        { content: 'Status', rowSpan: 2 },
      
      ],
      ['Product', 'Quantity', 'UOM', 'Unit Price', 'Amount']
    ];
  
    // Flatten the orders data
    const rows = [];
    ordersToReport.forEach(order => {
      const { customerID, customerName, totalAmount, orderSchedule, deliveryDate, createdAt, status } = order.WholesaleOrder;
      order.WholesaleOrder.products.forEach((product, index) => {
        rows.push({
          customerID: index === 0 ? customerID : '',
          customerName: index === 0 ? customerName : '',
          product: product.product,
          quantity: product.quantity,
          uom: product.uom,
          unitPrice: product.unitPrice,
          amount: product.amount,
          totalAmount: index === 0 ? totalAmount : '',
          orderSchedule: index === 0 ? orderSchedule : '',
          deliveryDate: index === 0 ? formatDate(deliveryDate) : '',
          createdAt: index === 0 ? formatDate(createdAt) : '',
          status: index === 0 ? status : '',
        
        });
      });
    });
  
    // Add the table to the PDF
    doc.autoTable({
      head: headers,
      body: rows.map(row => [
        row.customerID,
        row.customerName,
        row.product,
        row.quantity,
        row.uom,
        row.unitPrice,
        row.amount,
        row.totalAmount,
        row.orderSchedule,
        row.deliveryDate,
        row.createdAt,
        row.status,
        row.action
      ]),
      startY: 50,
      styles: { fontSize: 8, cellPadding: 1},
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { horizontal: 14 },
      theme: 'striped',
      columnStyles: {
        0: { cellWidth: 'wrap' }, // Customer ID
        1: { cellWidth: 'auto' }, // Customer Name
        2: { cellWidth: 'auto' }, // Product
        3: { cellWidth: 'auto' }, // Quantity
        4: { cellWidth: 'auto' }, // UOM
        5: { cellWidth: 'auto' }, // Unit Price
        6: { cellWidth: 'auto' }, // Amount
        7: { cellWidth: 'auto' }, // Total Amount
        8: { cellWidth: 'auto' }, // Order Schedule
        9: { cellWidth: 'auto' }, // Delivery Date
        10: { cellWidth: 'auto' }, // Order Date
        11: { cellWidth: 'auto' }, // Status
      
      },
      
    });
  
    // Save the PDF
    doc.save('wholesale-Monthly-Orders-Report.pdf');
  };
  
  
  
    return(
        <>
        <h1>Wholesale Order Dashboard</h1>

        <div className="iconnotify" onClick={handleIconClick}>
            <img className="iconnotifyimg" src={icon} alt="Cart Icon" />
            <div className="totalQuantityOnline">{unreadCount}</div>
        </div>

        {showNotifications && ( // Render notifications only if visible
      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
            
              <p>{notification}</p>
        
              
              <button onClick={() => deleteNotification(index)} className="delete-button">
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No notifications available</p>
        )}
      </div>
      )}
        

        
        <button className="generate-report-button" onClick={generateReport}  type="button" >Generate Report</button>
        <div className="search-container-WO">
                <input
                    type="text"
                    className="search-input-WO"
                    placeholder="Search by CustomerID or Order Status"
                    value={searchQuery}
                    onChange={handleSearchChange}
                
                />
                <button className="search-button-WO" onClick={handleSearchChange}>Search</button>
            </div>
      <table className='ordertable'>
        <thead className='ordertbheading'>
          <tr className='ordertbtr'>
          <th className='orderth'>Order ID</th>
            <th className='orderth'>Customer ID</th>
            <th className='orderth'>Customer Name</th>
            <th colSpan="5" className='orderthpp'>Products</th>
            <th className='orderth'>Total Amount</th>
            <th className='orderth'>Order Schedule</th>
            <th className='orderth'>Delivery Date</th>
            <th className='orderth'>Order Date</th>
            <th className='orderth'>Order Status</th>
            <th className='orderth'>Action</th>
          </tr>

         
          <tr className='ordertbtr'>
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'>Product</th>
            <th className='orderth'>Quantity</th>
            <th className='orderth'>UOM</th>
            <th className='orderth'>Unit Price</th>
            <th className='orderth'>Amount</th>
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
          </tr>
        </thead>
        <tbody className='orderbdy'>
        {filteredOrders.map((order) =>(
          order.WholesaleOrder.products.map((product, index) => (
            <tr className='ordertrbdy' key={`${order._id}-${index}`}>
              {index === 0 && (
                <>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.orderId}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.customerID}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.customerName}
                  </td>
                </>
              )}
              <td>{product.product}</td>
              <td>{product.quantity}</td>
              <td>{product.uom}</td>
              <td>{product.unitPrice}</td>
              <td>{product.amount}</td>
              {index === 0 && (
                <>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.totalAmount}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.orderSchedule}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {formatDate(order.WholesaleOrder.deliveryDate)}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
              {formatDate(order.WholesaleOrder.createdAt)} 
               </td>
                  <td>
                  {editingOrderId === order._id ? (
                  <select
                  value={order.WholesaleOrder.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  
                    
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
              
                ) : (
                  <span>{order.WholesaleOrder.status}</span>
                )}

              
                 </td>
                  {/*<td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.status}
                  </td>*/}
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {editingOrderId === order._id ? (
                  <>
                    {/*<button className="action-button save-button" onClick={() => updateOrderStatus(order._id, order.WholesaleOrder.status)} >Save</button>*/}
                    <button
        className="action-button save-button"
        onClick={() => {
          updateOrderStatus(order._id, order.WholesaleOrder.status);
          alert('Data updated successfully');
          setEditingOrderId(null);
        }}
      >
        Save
      </button>
                    <button className="action-button cancel-button" onClick={() => {handleCancelClick();setTemporaryStatus(order.WholesaleOrder.status); }}>
                      Cancel</button>
                  </>
                ) : (
                  <button className="action-button update-button" onClick={() => handleUpdateClick(order._id)}>Update</button>
                )}
                
                    <button className="action-button delete-button" onClick={() => handleDelete(order._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))
        ))}
        </tbody>
     


        
            
          
        
      </table>
        
        </>
    );
}

export default OrderDashboard;