import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import icon from './images/notifyicon.png';
import  "./OnlineOrderDB.css";

function OnlineOrderDB(){

    const[orders,setOrders] = useState([]);    //to read the data
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
        axios.get('http://localhost:8000/onlineorder')
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
    });
  
  
    const updateOrderStatus = (orderId, newStatus) => {
      axios.put(`http://localhost:8000/onlineorder/update/${orderId}`, { status: newStatus })
        .then(response => {
          if (response.data.success) {
            // Update the local state with the new data
            setOrders(orders.map(order => 
              order._id === orderId ? { ...order, OnlineOrder: { ...order.OnlineOrder, status: newStatus } } : order
            
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
          axios.delete(`http://localhost:8000/onlineorder/delete/${id}`)
              .then(response => {
                  if (response.data.success) {
                      // Update the local state by removing the deleted order
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

  //for search option
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-indexed
      const day = (`0${date.getDate()}`).slice(-2);
      return `${year}.${month}.${day}`;
    };
    
    const filteredOrders = orders.filter(order => 
      order.OnlineOrder.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.OnlineOrder.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDate(order.OnlineOrder.createdAt).includes(searchQuery)
    );

// Inside OnlineOrderDB component


const generateReport = () => {
  if (orders.length === 0) {
      alert('No orders available to generate a report.');
      return;
  }

  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString(); // Format the date as needed
   const month = currentDate.toLocaleString('default', { month: 'long' }); // E.g., "October"
  

  // Add the bakery name and date
  doc.setFontSize(16);
  doc.text('Miyurasa Bakers - Monthly Online Order Report', 50, 23);
  doc.setFontSize(12);
  doc.text(`Report Generated: ${currentDate}`, 14, 37);
  doc.text(`Month: Oct 2024`, 14, 32);
  doc.text(`Report By: Order Manager - Malmi Bandara`, 14, 42);
  
  // Define multi-level table headers
  const headers = [
      [
          { content: 'Order Id', rowSpan: 2 },
          { content: 'Customer Name', rowSpan: 2},
          { content: 'Phone Number', rowSpan: 2},
          { content: 'Address', rowSpan: 2},
          { content: 'Payment Method', rowSpan: 2},
          { content: '         Cart Items', colSpan: 3 },
          { content: 'Total Product Qty', rowSpan: 2},
          { content: 'Total Amount', rowSpan: 2},
          { content: 'Order Date', rowSpan: 2 },
          { content: 'Order Status', rowSpan: 2 }
          // Optional: Can be left blank or omitted
      ],
      [
          'Product',
          'Unit Price',
          'Quantity'
      ]
  ];

  // Flatten the orders data
  const rows = [];
  orders.forEach(order => {
      const { orderId,customerName, phoneNumber, address, paymentMethod, totQuantity, totPrice, createdAt, status } = order.OnlineOrder;
      order.OnlineOrder.cartItems.forEach((product, index) => {
          rows.push({
              orderId: index === 0 ? orderId : '',
              customerName: index === 0 ? customerName : '',
              phoneNumber: index === 0 ? phoneNumber : '',
              address: index === 0 ? address : '',
              paymentMethod: index === 0 ? paymentMethod : '',
              productName: product.productName,
              unitPrice: product.unitPrice,
              quantity: product.quantity,
              totQuantity: index === 0 ? totQuantity : '',
              totPrice: index === 0 ? totPrice : '',
              createdAt: index === 0 ? formatDate(createdAt) : '',
              status: index === 0 ? status : '',
             
          });
      });
  });

  // Define table body with repeated customer details
  const tableBody = rows.map(row => [
      row.orderId,
      row.customerName,
      row.phoneNumber,
      row.address,
      row.paymentMethod,
      row.productName,
      row.unitPrice,
      row.quantity,
      row.totQuantity,
      row.totPrice,
      row.createdAt,
      row.status,
      
  ]);

  // Add the table to the PDF
  doc.autoTable({
      head: headers,
      body: tableBody,
      startY: 50,
      styles: { fontSize: 8, cellPadding: 1},
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { horizontal: 12 },
      theme: 'striped',
      columnStyles: {
          0: { cellWidth: 'wrap' }, // order id
          1: { cellWidth: 'auto' }, // Customer Name
          2: { cellWidth: 'wrap' }, // Phone Number
          3: { cellWidth: 'auto' },// Address
          4: { cellWidth: 'wrap' },  // Payment Method
          5: { cellWidth: 'wrap' }, // Product
          6: { cellWidth: 'auto' }, // Unit Price
          7: { cellWidth: 'auto' }, // Quantity
          8: { cellWidth: 'auto' }, // Total Product Qty
          9: { cellWidth: 'auto' }, // Total Amount
          10: { cellWidth: 'wrap' }, // Order Date
          11: { cellWidth: 'wrap' },  // Order Status
         
      },
      // Optional: Adjust table width or handle page breaks
  });

  // Save the PDF
  doc.save('online-orders-report.pdf');
};

  


    return(
        <>
        <div className='Online-ordeDB'>
        <h1>Online Order Dashboard</h1>
        
        
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
        

        <div className="report-container">
       <button className="generate-report-button" onClick={generateReport}>Generate Report</button>
       
        </div>
       
<div className="search-container-OB">
        <input
            type="text"
            className="search-input-online"
            placeholder="Search by Customer Name or Order Status"
           value={searchQuery}
            onChange={handleSearchChange}
        
        />
        <button className="search-button-OB" onClick={handleSearchChange}>Search</button>
        
</div>
<div className='ordertb'>
<table className='ordertable'>
<thead className='ordertbheading'>
  <tr className='ordertbtr'>
    <th className='orderth'>Order ID</th> {/* Add this line */}
    <th className='orderth'>Customer Name</th>
    <th className='orderth'>Customer PhoneNumber</th>
    <th className='orderth'>Customer Address</th>
    <th className='orderth'>Payment Method</th>
    <th colSpan="3" className='orderthpp'>Cart Items</th>
    <th className='orderth'>Total Product Qty</th>
    <th className='orderth'>Total Amount</th>
    <th className='orderth'>Order Date</th>
    <th className='orderth'>Order Status</th>
    <th className='orderth'>Action</th>
  </tr>

 
  <tr className='ordertbtr'>
    <th className='orderth'></th>
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'>Product</th>
    <th className='orderth'>Unit Price</th>
    <th className='orderth'>Quantity</th>
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
  </tr>
</thead>

<tbody className='orderbdy'>
{filteredOrders.map((order) =>(
  
  order.OnlineOrder.cartItems.map((product, index) => (    //product--> pahala array eke dane name eke
    <tr className='ordertrbdy' key={`${order._id}-${index}`}>
      {index === 0 && (
        <>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.orderId}</td> {/* Display Order ID */}
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.customerName}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.phoneNumber}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.address}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.paymentMethod}</td>
        </>
      )}
      <td>{product.productName}</td>
      <td>{product.unitPrice}</td>
      <td>{product.quantity}</td>

      {index === 0 && (
        <>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {order.OnlineOrder.totQuantity }</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {order.OnlineOrder.totPrice}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {formatDate(order.OnlineOrder.createdAt)}</td>

          <td>
                {editingOrderId === order._id ? (
                <select
                    value={order.OnlineOrder.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Busy">Busy</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            
                ) : (
                <span>{order.OnlineOrder.status}</span>
                )}
          </td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>
            {editingOrderId === order._id ? (
          <>
            <button className="action-button save-button" onClick={() => {
                            updateOrderStatus(order._id, order.OnlineOrder.status);
                            alert('Data updated successfully');
                            setEditingOrderId(null);
                            }}>
            Save
            </button>
            <button className="action-button cancel-button" onClick={() => {handleCancelClick();setTemporaryStatus(order.OnlineOrder.status); }}>
            Cancel
            </button>
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
</div>

        </div>
        

        </>
    );
}

export default OnlineOrderDB;