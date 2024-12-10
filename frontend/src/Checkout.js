
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from "./Header";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';



//import { useCart } from './CartContext';
import './Checkout.css';

function Checkout(){

  //const { cartItems, incrementQuantity, decrementQuantity } = useCart();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const navigate = useNavigate();
  const validateName = (name) => {
    // Remove any digits from the name
    const sanitizedValue = name.replace(/\d/g, '');
  
    if (sanitizedValue !== name) {
      alert('Name should not contain numbers');
    }
  
    return sanitizedValue;
  };


  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };
//newwwwwww
  const [items, setItems] = useState(cartItems);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity());
    const [totalPrice, setTotalPrice] = useState(getTotalPrice());

  
 
  
  //const [onlineOrder, setOnlineOrder] = useState([]);
  const [newOnlineOrder, setNewOnlineOrder] = useState({
    orderId: '',
    customerName : '',
    phoneNumber: '',
    address: '',
    paymentMethod: '',
    cartItems: items,
    totQuantity:totalQuantity,
    totPrice:totalPrice,
    createdAt: '',
    status: 'Pending'
  }); 

 
  useEffect(() => {
    // When cartItems changes, update total quantity and price
   
    setNewOnlineOrder((prevOrder) => ({
      ...prevOrder,
      cartItems: items,                         //change---------------------
      totQuantity:totalQuantity,
      totPrice: totalPrice,
    }));
  }, [items,totalQuantity, totalPrice]); //change--------------------------


  //------------------------------------------------

   // Fetch order notifications from the server
   /*const fetchOrderNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notifications'); // Replace with your actual notifications endpoint
      if (response.data) {
        // Process the notifications data if necessary
        console.log('Fetched notifications:', response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
   // Fetch notifications on component mount
   useEffect(() => {
    fetchOrderNotifications();
  }, []);*/

 const handleInputChange = (e) => {

      const {name,value} = e.target;
      if (name === 'customerName') {
        const sanitizedValue = validateName(value);
        setNewOnlineOrder((prevOrder) => ({
          ...prevOrder,
          customerName: sanitizedValue
        }));
      } else{
        setNewOnlineOrder(prevOrder => ({
          ...prevOrder,
          [name]: value
        }));
      }
    
      
  };

  const generateOrderId = () => {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `ORD-${timestamp}-${randomNum}`;
  };
  
  const formatDateTime = () => {
    const currentDate = new Date();
    const padZero = (num) => (num < 10 ? '0' + num : num);
    return `${currentDate.getFullYear()}-${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
  };

  const handleCartItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    console.log('Updated cart items:', newItems);  // Debugging line
  
    // Update the newOnlineOrder's cartItems as well
    setNewOnlineOrder(prevOrder => ({
      ...prevOrder,
      cartItems: newItems,
    
    }));
  };


  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

     // Generate a new orderId
    const generatedOrderId = generateOrderId();
    //const currentDate = new Date().toISOString();
    const currentDate = formatDateTime();
    const orderData = {
      orderId: generatedOrderId,
      customerName: newOnlineOrder.customerName,
      phoneNumber: newOnlineOrder.phoneNumber,
      address: newOnlineOrder.address,
      paymentMethod:newOnlineOrder.paymentMethod,
      cartItems: items, // using updated cart items
        totQuantity: getTotalQuantity(),
        totPrice: getTotalPrice(),
      createdAt:currentDate,
      status: newOnlineOrder.status,
    };
    console.log('Order Data to be sent:', orderData);
    axios.post('http://localhost:8000/onlineorder/create', { OnlineOrder: orderData }) // Use 'WholesaleOrder' here
      .then(response => {
        if (response.data.success) {

        //   const notificationData = {
        //     message: `Order ${generatedOrderId} has been successfully placed!`,
        //     time: new Date().toISOString(),
        // };

        //await axios.post('http://localhost:8000/notifications', notificationData); 
          // Update the state with the newly added order
          //setOnlineOrder([...onlineOrder, response.data.Onlineorderdetails]);
          setItems([]); // Clear the cart
         
        setTotalQuantity(0); // Reset total quantity
        setTotalPrice(0); 
        //getTotalPrice(0);
          // Reset the form fields
          setNewOnlineOrder({
            orderId: '',
            customerName: '',
            phoneNumber: '',
            address: '',
            paymentMethod: '',
            cartItems: [],
            totQuantity: 0,
            totPrice: 0,
            createdAt: '',  // Reset createdAt to empty or set to a new Date() if needed
            status: 'Pending'
          });
  
          alert('Data added successfully');
          navigate('/Online', { state: { cartItems: [] } }); // Cart items passed as empty array
          
          const orderPlacedMessage = `Order ${generatedOrderId} has been successfully placed! at: ${currentDate}`;
          const notifications = JSON.parse(sessionStorage.getItem('notifications')) || [];
          notifications.push(orderPlacedMessage); // Push order placed message
      
          sessionStorage.setItem('notifications', JSON.stringify(notifications)); 
          
           // Track unread notifications separately
           const unreadNotifications = JSON.parse(sessionStorage.getItem('unreadNotifications')) || [];
           unreadNotifications.push(orderPlacedMessage);
           sessionStorage.setItem('unreadNotifications', JSON.stringify(unreadNotifications));
           sessionStorage.setItem('recentOrderId', generatedOrderId); // Store recent order ID in session storage 
          
                
        } else {
          alert('Failed to add order');
        }
      })
      .catch(error => {
        // Log the error details
        console.error("There was an error creating the order:", error);
        alert('There was an error creating the order:', error);
      });
  };
  

    return(
        <div className='checkout'>
                <Header/>

                <div class="checkoutLayout">

                    <div className="returnCart">
                                <button className='returncart-btn'onClick={() => navigate('/Online', { state: { cartItems } })}>Keep Shopping</button>
                        
                        <h1>List Product in Cart</h1>
                        <div className="list">
                            <div className="checkout-cartitemlist">
            
                                       <h2 className='cartItems'>Cart Items</h2>
                                        <ul>
                                            {items.map((item, index) => (
                                            <li key={index}>
                                                    <div className='item-info'>
                                                    <div className="item-info-name"> {item.productName}   </div>   
                                                    <div className="item-info-price">Rs.{item.unitPrice}</div>
                                                    <div className="item-info-qty">{item.quantity}</div>
                                                    </div>
                                               
                                            </li>
                                            ))}
                                        </ul>
                                        <h3>Total Price: Rs.{getTotalPrice()}</h3>
                            </div>
                        </div>
                    </div>


            <div className="right">

            <form className="checkout-form" onSubmit={handleSubmit} > 
            <h1>Checkout</h1>

                    <div className="form">
                        <div className="group">
                            <label for="name"> Name</label>
                            <input type="text" name="customerName" id="customerName"  pattern="[A-Za-z\s]+" value={newOnlineOrder.customerName} onChange={handleInputChange}  
        title="Name should only contain letters and spaces."/>
                        </div>

                        <div className="group">
                            <label for="phone">Phone Number</label>
                            <input type="phone" name="phoneNumber" id="phoneNumber" value={newOnlineOrder.phoneNumber} onChange={handleInputChange} 
        title="Phone number should be exactly 10 digits." 
        pattern="0[0-9]{9}"  
                  maxlength="10"/>
                        </div>

                        <div className="group">
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" value={newOnlineOrder.address} onChange={handleInputChange} />
                        </div>

                        <div className="group">
                            <label for="payment">Payment Method</label>
                            <select name="paymentMethod" id="paymentMethod" value={newOnlineOrder.paymentMethod} onChange={handleInputChange} >
                                <option value="option">Select Payment Method</option>
                                <option value="cod">Cash On Delivery</option>
                                <option value="visaMaster">Pay with VISA/MASTER Card On Delivery</option>
                                <option value="Amex">Pay with AMEX Card On Delivery</option>
                            </select>
                        </div>


                    </div>

                    <div className="return">

                            <div className="list">
                                    <div className="checkout-cartitemlist">

                                            <h2>Cart Items</h2>
                                                <ul>
                                                    {items.map((item, index) => (
                                                    <li key={index}>
                                                            <div className='item-info'>
                                                            {/*<input type="text" name="productName" id="productName" value={cartItems.productName} onChange={handleInputChange} >{item.name} </input>
                                                            <input type="text" name="unitPrice" id="unitPrice" value={cartItems.unitPrice} onChange={handleInputChange} >${item.price}</input>
                                                            <input type="text" name="quantity" id="quantity" value={cartItems.quantity} onChange={handleInputChange} >{item.quantity} </input>
                                                            <div className="item-info-name"> {item.name}   </div>   
                                                            <div className="item-info-price">${item.price}</div>
                                                            <div className="item-info-qty">{item.quantity}</div>*/}
                                                            <input type="text" className='autofill' name="name" value={item.productName} onChange={(e) => handleCartItemChange(index, 'name', e.target.value)} readOnly /> {/*onChange={(e) => handleCartItemChange(index, 'name', e.target.value)} */}
                                                            <div>Rs.</div> <input type="text" className='autofill' name="price" value={item.unitPrice} onChange={(e) => handleCartItemChange(index, 'price', e.target.value)} readOnly  /> {/*onChange={(e) => handleCartItemChange(index, 'price', e.target.value)}  */}
                                                            <input type="text" className='autofill' name="quantity"value={item.quantity} onChange={(e) => handleCartItemChange(index, 'quantity', e.target.value)} readOnly/>  {/* onChange={(e) => handleCartItemChange(index, 'quantity', e.target.value)}*/}
                                                            </div>
                                                    
                                                    </li>
                                                    ))}
                                                </ul>
                                                {/*<h3>Total Price: ${getTotalPrice()}</h3>*/}
                                    </div>
                            </div>

                            <div className="row">
                                <div className='pricelabel'><label>Total Quantity</label></div>
                                <input type="number"   className='autofill-qty' name="totalQuantity" value={totalQuantity} onChange={handleInputChange} readOnly />
                                {/*<div className="totalQuantity" >{getTotalQuantity()}</div> */}  {/*value={newOnlineOrder.totQuantity} onChange={handleInputChange}*/}
                            </div>

                            <div className="row">
                                <div className='pricelabel'><label>Total Price</label></div>
                                <div className='price-tot'>Rs.</div><input type="number" className='autofill-qty' value={totalPrice} onChange={handleInputChange} readOnly />
                                {/*<div className="totalPrice" >${getTotalPrice()}</div>*/} {/*value={newOnlineOrder.totPrice} onChange={handleInputChange}*/}
                            </div>
                    </div>
                    <button type="submit" className="buttonCheckout">CHECKOUT</button>


            </form> 
                
            </div> 
          </div>



</div>
           
    

    );
}

export default Checkout;