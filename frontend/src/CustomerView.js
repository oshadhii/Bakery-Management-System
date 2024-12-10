import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerView.css';

function CustomerView(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    //popup display variables;
    const [display, setDisplay] = useState(false);
    const [itemId, setItemId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      // Fetch posts from the backend
      axios.get('http://localhost:8000/posts')
          .then(response => {
              if (response.data.success) {
                  setItems(response.data.data);
              } else {
                  alert('Failed to fetch posts');
              }
          })
          .catch(error => {
              alert('There was an error fetching the posts!', error);
          });
    }, []);

    const handleUpdate = (itemId) => {
        axios.put(`http://localhost:8000/posts/update/${itemId}`, {
            name: name,
            Address: address,
            Phone_number: phoneNumber,
            Email: email,
            user_name: userName,
            password: password
        })
        .then(response => {
            if (response.data.success){
                setItems(items.map(item =>
                    item._id === itemId ? {...item, customer: {...item.customer, name: name, Address: address, Phone_number: phoneNumber, Email: email, user_name: userName, password: password } } : item
                ));
                alert('Data updated successfully...');
                setDisplay(false);
            }
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/posts/delete/${id}`)
        .then(response => {
            if(response.data.success){
                setItems(items.filter(item => item._id !== id));
                alert('Data deleted successfully.');
            } else {
                alert('Failed to delete data.');
            }
        })
        .catch(error => {
            console.error('There was an error deleting the item:', error);
            alert('There was an error in deleting items');
        });
    };

    return (
    <>
        <div className="customercontainer1">
            <h3>Customer Details</h3>
            <button className='customeradd' onClick={() => navigate('/Customer')}>Add New Customer</button>
            <div className='customerTable'>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.customer.name}</td>
                            <td>{item.customer.Address}</td>
                            <td>{item.customer.Phone_number}</td>
                            <td>{item.customer.Email}</td>
                            <td>{item.customer.user_name}</td>
                            <td>{'*'.repeat(item.customer.password.length)}</td>
                            <td>
                                <button className="customeredit" onClick={() => {
                                    setItemId(item._id);
                                    setDisplay(true);
                                }}>Update</button>
                                {display && (
            <div className="customerpopup-background">
                <div className="customerpopup-form">
                    <form onSubmit={(e) => {e.preventDefault(); handleUpdate(itemId);}}>
                      <p>{itemId}</p>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={item.name} onChange={(e) => setName(e.target.value)} />
                        <br/>
                        <label htmlFor="addrs">Address</label>
                        <input type="text" id="addrs" value={item.address} onChange={(e) => setAddress(e.target.value)} />
                        <br/>
                        <label htmlFor="num">Phone number</label>
                        <input type="number" id="num" value={item.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <br/>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={item.email} onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <label htmlFor="userName">User Name</label>
                        <input type="text" id="userName" value={item.userName} onChange={(e) => setUserName(e.target.value)} />
                        <br/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={item.password} onChange={(e) => setPassword(e.target.value)} />
                        <br/>
                        <button type="submit" className="customersubmit-button">Submit</button>
                        <button type="button" onClick={() => setDisplay(false)}>Close</button>
                    </form>
                </div>
            </div>
        )}

                                <button className='customerdelete' onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Popup Form */}
    </>
    );
}

export default CustomerView;