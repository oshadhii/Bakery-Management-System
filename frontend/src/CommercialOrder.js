import orderimg from './images/orderimg.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { UilFacebookF, UilInstagram, UilTwitter } from '@iconscout/react-unicons';
import './CommercialOrder.css';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import  Header from './Header';
import axios from 'axios';




function CommercialOrder() {


  
  const [wholesaleOrder, setWholesaleOrder] = useState([]);
  const [newWholesaleOrder, setNewWholesaleOrder] = useState({
    customerID: '',
    customerName: '',
    products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
    totalAmount: 0,
    orderSchedule: '',
    deliveryDate: '',
    createdAt: '',
    status: 'Pending'
  }); 

  const [products, setProducts] = useState([
    { id: 1, product: '', quantity: '', uom: '', unitPrice: '', amount: '' },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  const productData = {
    "Sausage Bun": {uom: 'Piece', unitPrice: 80},
    "Egg Bun": {uom: 'Piece', unitPrice: 80},
    "Fish Bun": {uom: 'Piece', unitPrice: 60},
    "Chicken Bun": {uom: 'Piece', unitPrice: 100},
    "Cheese Bun": {uom: 'Piece', unitPrice: 150},
   
    
  };
  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, product: '', quantity: '', uom: '', unitPrice: '', amount: '' }]);
  };
  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    calculateTotalAmount(newProducts); // Recalculate the total amount after removing a product
  };
  {/*const handleChange = (e, index = null) => {
    if (index !== null) {
      // Call handleProductChange for product-specific changes
      handleProductChange(index, e);
    } else {
      // Call handleInputChange for wholesale order changes
      handleInputChange(e);
    }
  };*/}const validateName = (name) => {
  // Regular expression to allow only letters and spaces
  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(name)) {
    alert('Name should only contain letters and spaces.');
    return false; // Invalid name
  }
  return true; // Valid name
};

  const handleCombinedChange = (index, event) => {
    handleProductChange(index, event);  // Call the product change handler
    handleInputChange(event);  // Call the input change handler
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field being changed is the customer name
    if (name === 'customerName') {
      // Validate the name
      if (validateName(value)) {
        // Only update the state if the name is valid
        setNewWholesaleOrder((prevOrder) => ({
          ...prevOrder,
          [name]: value
        }));
      } else {
        // Clear the input if validation fails
        setNewWholesaleOrder((prevOrder) => ({
          ...prevOrder,
          customerName: ''
        }));
      }
    } else {
      // Update other fields normally
      setNewWholesaleOrder((prevOrder) => ({
        ...prevOrder,
        [name]: value
      }));
    }
  };
const handleProductChange = (index, event) => {
      const newProducts = [...products];
      //newProducts[index][event.target.name] = event.target.value;
      const { name, value } = event.target;

      newProducts[index][name] = value;
      if (name === 'product') {
        newProducts[index].uom = productData[value].uom;
        newProducts[index].unitPrice = productData[value].unitPrice;
      }

      if (name === 'quantity' || name === 'unitPrice') {
        newProducts[index].amount = newProducts[index].quantity * newProducts[index].unitPrice;
      }

      setProducts(newProducts);
      calculateTotalAmount(newProducts);
  };

  const calculateTotalAmount = (products) => {
    const total = products.reduce((accumulator, product) => accumulator + (parseFloat(product.amount) || 0), 0);
    setTotalAmount(total);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate ();

  const generateOrderId = () => {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `WO-${timestamp}-${randomNum}`;
  };

  {/*const handleSubmit = async (e) => {
    e.preventDefault();          //Prevents page refresh on form submission.
    try {
      const response = await axios.post('http://localhost:8000/order/create', {wholesaleOrder:newWholesaleOrder });
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };*/}

  
 {/* const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerID: newWholesaleOrder.customerID,
      customerName: newWholesaleOrder.customerName,
      products: products,
      totalAmount: totalAmount,
      orderSchedule: newWholesaleOrder.orderSchedule,
      deliveryDate: newWholesaleOrder.deliveryDate,
      createdAt: new Date().toISOString(),
      status: newWholesaleOrder.status,
    };

    try {
      const response = await axios.post('http://localhost:8000/order/create',orderData);
      if (response.status === 200) {
        alert('Order placed successfully!');
        console.log(response.data.wholsesaleorderdetails);
         //navigate('/main');  Redirect to main page after order is placed
      } else {
        alert('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };
*/}
const handleSubmit = (e) => {
  e.preventDefault();

  
  // Generate a new orderId
  const generatedOrderId = generateOrderId();

  const orderData = {
    orderId: generatedOrderId,
    customerID: newWholesaleOrder.customerID,
    customerName: newWholesaleOrder.customerName,
    products: products,
    totalAmount: totalAmount,
    orderSchedule: newWholesaleOrder.orderSchedule,
    deliveryDate: newWholesaleOrder.deliveryDate,
    createdAt: new Date().toISOString(),
    status: newWholesaleOrder.status,
  };

  axios.post('http://localhost:8000/wholesaleOrder/create', { WholesaleOrder: orderData }) // Use 'WholesaleOrder' here
    .then(response => {
      if (response.data.success) {
        // Update the state with the newly added order
        setWholesaleOrder([...wholesaleOrder, response.data.wholsesaleorderdetails]);

        // Reset the form fields
        setNewWholesaleOrder({
          orderId: '',
          customerID: '',
          customerName: '',
          products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
          totalAmount: 0,
          orderSchedule: '',
          deliveryDate: '',
          createdAt: '',  // Reset createdAt to empty or set to a new Date() if needed
          status: 'Pending'
        });
       

        alert('Data added successfully');
        setProducts([
          { id: 1, product: '', quantity: '', uom: '', unitPrice: '', amount: '' }
        ]);

        // Reset the total amount to zero
        setTotalAmount(0);
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


{/*neww----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8000/order/create', { wholesaleOrder: newWholesaleOrder })
      .then(response => {
        if (response.data.success) {
          // Update the state with the newly added order
          setWholesaleOrder([...wholesaleOrder, response.data.wholsesaleorderdetails]);
  
          // Reset the form fields
          setNewWholesaleOrder({
            customerID: '',
            customerName: '',
            products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
            totalAmount: 0,
            orderSchedule: '',
            deliveryDate: '',
            createdAt: '',  // Reset createdAt to empty or set to a new Date() if needed
            status: 'Pending'
          });
  
          alert('Data added successfully');
        } else {
          alert('Failed to add order');
        }
      })
      .catch(error => {
        // Handle any error that occurs during the API call
        //console.error("There was an error creating the order:", error);
        alert('There was an error creating the order',error);
      });
  };
  */}
  





  
{/*const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8000/order/create',{wholesaleOrder:newWholesaleOrder })
    .then(response => {
      if(response.data.success){
        setWholesaleOrder([...wholesaleOrder,response.data.wholsesaleorderdetails]);
        newWholesaleOrder({
          customerID: '',
          customerName: '',
          products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
          totalAmount: 0,
          orderSchedule: '',
          deliveryDate: '',
          createdAt: new Date(),
          status: 'Pending'});
          alert('Data added successfully');
      }else{
        alert('Failed to add order');
      }
      
    })
    .catch(error => {
      // Handle any error that occurs during the API call
      console.error("There was an error creating the order:", error);
    });

  } */}
  
  return (
    
    
    <div className="Corder">
       <Header/>


      <div className="content-wholesale">
        <h1 className="centered-heading">Place Your Orders</h1>
        <form className="order-form" onSubmit={handleSubmit} >   
          
            <label className="CustomerID">Customer ID</label>
            <input type="text" id="CustomerID" name="customerID" required placeholder="Customer ID" value={newWholesaleOrder.customerID}  onChange={handleInputChange}/> {/*value={newWholesaleOrder.customerName}  onChange={(e) => handleChange(e)}*/}

            <label htmlFor="CustomerName">Customer Name</label>
            <input type="text" id="CustomerName" name="customerName" required placeholder="Customer Name" value={newWholesaleOrder.customerName} pattern="[A-Za-z\s]+"  onChange={handleInputChange}/> {/*value={newWholesaleOrder.customerName}   onChange={(e) => handleChange(e)}*/}
            <br/>
            <div className="product-row">
              <label>Select the Product</label>
              <label>Quantity</label><t></t>
              <label>UOM</label><t></t>
              <label>Unit Price</label><t></t>
              <label>Amount</label>
            </div>

            {products.map((product, index) => (
              <div className="product" key={product.id}>
                <div className="select-bar2">
                  <select className="select-bar"name="product" value={product.product} onChange={(e) => handleCombinedChange(index, e)}  >  {/*onChange={(e) => handleProductChange(index, e)}*/}
                    <option value="" disabled>Select the product</option>
                    <option value="Sausage Bun">Sausage Bun</option>
                    <option value="Egg Bun">Egg Bun</option>
                    <option value="Fish Bun">Fish Bun</option>
                    <option value="Chicken Bun">Chicken Bun</option>
                    <option value="Cheese Bun">Cheese Bun</option>
                    
                
                  </select>







                </div>
                <input type="number" className="number" name="quantity" value={product.quantity} onChange={(e) => handleCombinedChange(index, e)} placeholder="Quantity"  min="0"/>
                <input type="text" className="autofillC" name="uom" value={product.uom} onChange={(e) => handleCombinedChange(index, e)} placeholder="UOM" readOnly />
                <input type="text" className="autofillC" name="unitPrice"value={product.unitPrice} onChange={(e) => handleCombinedChange(index, e)} placeholder="Unit price" readOnly/>
                <input type="text" className="autofillC" name="amount" value={product.amount} onChange={(e) => handleCombinedChange(index, e)} placeholder="Amount" readOnly/>
                <button type="button" className="addbtn" onClick={addProduct}>+</button>
                <button type="button" className="removebtn" onClick={() => removeProduct(index)}>-</button>
              </div>
            ))}
            
  <br></br>
            <label>Total Amount</label>
            <input type="text"   className="autofillC" placeholder="Total Amount" value={totalAmount.toFixed(2)} onChange={handleInputChange} readOnly />   {/*value={totalAmount.toFixed(2)}*/}

            <label>Order Schedule</label>
            <input type="text" placeholder="Daily" name="orderSchedule" value={newWholesaleOrder.orderSchedule} onChange={handleInputChange} />
            
            <label htmlFor="delivery-date" >Select Delivery Date: </label>
            <input type="date" id="date" name="deliveryDate" required placeholder="date" value={newWholesaleOrder.deliveryDate} onChange={handleInputChange}   min={new Date().toISOString().split("T")[0]} 
  max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]}  />
                {/*<DatePicker
                    id="delivery-date"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                />*/}

            
            <button type="submit" className="Comorderbtn" >Place Order</button> {/*onClick={ () => Navigate('/main')}*/}
         
        </form>
      </div>
    </div>
  );
}

export default CommercialOrder;

