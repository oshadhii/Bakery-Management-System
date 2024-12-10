import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './View.css';

function OrdersView(){
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/Supplierorder/read') 
          .then(response => {
              if (response.data.success) {
                  setItems(response.data.order);
              } else {
                  alert('Failed to fetch posts');
              }
          })
          .catch(error => {
              alert('There was an error fetching the posts!', error);
          });
  });

  // Delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/Supplierorder/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setItems(items.filter(item => item._id !== id));
          alert('Data deleted successfully.');
        } else {
          alert('Failed to delete data.');
        }
      })
      .catch(error => {
        alert('Error deleting item.');
      });
  };

    return(
    <>
    <header>
    </header>

      <div className="suppliercontainer1">
        <h3>Orders Details</h3>
        <button className='supplieraddbtn' onClick={() => navigate('/OrderForm')}>Place Orders</button>
        <button className='supplieraddbtn' onClick={() => navigate('/dashboard/orderreport')}>Inventory Order Details</button>
        <div className='supplierTable'>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Order Date</th>
                <th>Product Categories</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {items.map((item)=> (
                <tr key={item._id}>
                  <td>{item.orderTable?.companyName}</td>
                  <td>{item.orderTable?.date}</td>
                  <td>{item.orderTable?.productCategories}</td>
                  <td>{item.orderTable?.quantity}</td>
                  <td>{item.orderTable?.price}</td>
                  <td><button className='supplierdelete' onClick={() => handleDelete(item._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdersView;