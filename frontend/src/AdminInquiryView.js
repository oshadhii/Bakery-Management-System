import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CustomerView.css';
import './Customer.css';

function AdminInquiryView() {
  const [items, setItems] = useState([]);
  const[orders,setOrders] = useState([]); 
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [temporaryStatus, setTemporaryStatus] = useState('');

  // Read
  useEffect(() => {
    axios.get('http://localhost:8000/inquiry/read')
      .then(response => {
        if (response.data.success) {
          setItems(response.data.inquiry);
        } else {
          alert('Failed to fetch posts');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts!', error);
      });
  }, []);

  //update
  const updateOrderStatus = (itemId, newStatus) => { 
    axios.put(`http://localhost:8000/inquiry/update/${itemId}`, { status: newStatus }) 
      .then(response => { 
        if (response.data.success) { 
          // Update the local state with the new data 
          setOrders(items.map(item =>  
            item._id === itemId ? { ...item, inquiryTable: { ...item.inquiryTable, status: newStatus } } : item 
          )); 
          
        } else { 
          alert("Failed to update status"); 
        } 
      }) 
      .catch(error => { 
        alert('There was an error updating the status', error); 
      }); 
  }; 
 
  const handleUpdateClick = (itemId) => { 
    setEditingOrderId(itemId); // Set the editing order ID to show the dropdown 
  }; 
 
  const handleCancelClick = () => { 
    setEditingOrderId(null); // Hide the dropdown without making any changes 
  };

  // Delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/inquiry/delete/${id}`)
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

  return (
    <>
      <header></header>

      <div className="customercontainer1">
        <h3>Inquiry Details</h3>
        <div className='customerTable'>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Preferred Method Of Response</th>
              <th>Questionor Concerns</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item)=> (
              <tr key={item._id}>
                <td>{item.inquiryTable?.Name}</td>
                  <td>{item.inquiryTable?.Email}</td>
                  <td>{item.inquiryTable?.Phone_Number}</td>
                  <td>{item.inquiryTable?.PreferredMethodOfResponse}</td>
                  <td>{item.inquiryTable?.QuestionorConcerns}</td>

                   <td>{editingOrderId === item._id ? ( 
                  <select 
                  name="status"
                  value={item.inquiryTable?.status} 
                    onChange={(e) => updateOrderStatus(item._id, e.target.value)} 
                   > 
                    <option value="Pending">Pending</option> 
                    <option value="Confirmed">Confirmed</option> 
                  </select> 
               
                ) : ( 
                  <span>{item.inquiryTable?.status}</span> 
                )}</td>

                  <td> 
                    {editingOrderId === item._id ? ( 
                  <> 
                  <button className="customeredit" onClick={() => { 
                            updateOrderStatus(item._id, item.inquiryTable?.status); 
                            alert('Data updated successfully'); 
                            setEditingOrderId(null); 
                          }}> Save </button> 
                    <button className="customerdelete" onClick={() => {handleCancelClick();setTemporaryStatus(item.inquiryTable?.status); }}> 
                      Cancel</button> 
                  </> 
                ) : ( 
                  <button className="customeredit" onClick={() => handleUpdateClick(item._id)}>Update</button> 
                )} 
                 
                 <button className='customerdelete' onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default AdminInquiryView;