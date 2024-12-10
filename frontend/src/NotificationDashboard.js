import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import './NotificationDashboard.css';
import icon from './images/notifyicon.png';

const NotificationDashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false); // State to control visibility
    const [showOrders, setShowOrders] = useState(false); // State to control order notifications visibility
    const [unreadCount, setUnreadCount] = useState(0); 
    //const [swipedIndex, setSwipedIndex] = useState(null); // Keep track of which notification is swiped
    //const swipeRefs = useRef([]);

    useEffect(() => {
      const storedNotifications = JSON.parse(sessionStorage.getItem('notifications')) || [];
      setNotifications(storedNotifications);
      setUnreadCount(storedNotifications.length);
    }, []);


// Function to calculate time ago
/*const timeAgo = (timestamp) => {
    const now = new Date().getTime();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    let interval = Math.floor(seconds / 31536000); // Years
    if (interval >= 1) return ${interval} year${interval > 1 ? 's' : ''} ago;
    
    interval = Math.floor(seconds / 2592000); // Months
    if (interval >= 1) return ${interval} month${interval > 1 ? 's' : ''} ago;
    
    interval = Math.floor(seconds / 86400); // Days
    if (interval >= 1) return ${interval} day${interval > 1 ? 's' : ''} ago;
    
    interval = Math.floor(seconds / 3600); // Hours
    if (interval >= 1) return ${interval} hour${interval > 1 ? 's' : ''} ago;
    
    interval = Math.floor(seconds / 60); // Minutes
    if (interval >= 1) return ${interval} minute${interval > 1 ? 's' : ''} ago;
    
    return ${seconds} second${seconds > 1 ? 's' : ''} ago;
};
*/
   // Function to delete a notification
   const deleteNotification = (indexToDelete) => {
    const updatedNotifications = notifications.filter((_, index) => index !== indexToDelete);

    // Update state and sessionStorage
    setNotifications(updatedNotifications);
    sessionStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const handleIconClick = () => {
    setShowNotifications(prev => !prev); // Toggle notifications
    setShowOrders(false); // Ensure orders are hidden when notifications are shown

    // If showing notifications, clear the count
    /*if (!showNotifications) {
        setNotifications([]); // Clear notifications when they are shown
        sessionStorage.setItem('notifications', JSON.stringify([])); // Update session storage
    }*/

    if (!showNotifications) {
        setUnreadCount(0); // Set unread count to 0 when notifications are viewed
    }
};
  // Toggle notifications visibility
  const handleOrderClick = () => {
    setShowOrders(prev => !prev); // Toggle order notifications
    setShowNotifications(false); // Ensure notifications are hidden when orders are shown
};


  /*<div
              key={index}
              className={notification-item ${swipedIndex === index ? 'swiped' : ''}}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={handleTouchEnd}
            >*/
  return (
    <div className="dashboard">
      <h2>Notification Dashboard</h2>
            <div className="icon" onClick={handleIconClick}>
                <img src={icon} alt="Notification Icon" />
                <div className="totalQuantity">{unreadCount}</div>
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

{showOrders && (
                <div className="order-notifications">
                    <h2>Order Notifications</h2>
                    <ul>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li key={index}>
                                    <div className="item-info-name">{notification.message}</div>
                                    
                                    <button onClick={() => deleteNotification(index)} className="delete-button">
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No order notifications available</p>
                        )}
                    </ul>
                </div>
            )}
    </div>
  );
};

export default NotificationDashboard;

//<span className="time">{timeAgo(notification.timestamp)}</span>