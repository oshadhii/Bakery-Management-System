import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './View.css';
import './SupplierForm.css';

function View() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const [itemId, setItemId] = useState('');
  const [Email, setemail] = useState('');
  const [MobileNumber, setmobileNumber] = useState('');
  const [Price, setprice] = useState('');

  // Read
  useEffect(() => {
    axios.get('http://localhost:8000/SupplierTable/read')
      .then(response => {
        if (response.data.success) {
          setItems(response.data.supplier);
        } else {
          alert('Failed to fetch posts');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts!', error);
      });
  }, []);

  // Update
  const handleUpdate = (itemId) => {
    axios.put(`http://localhost:8000/SupplierTable/update/${itemId}`, {
        email: Email,
        mobileNumber: MobileNumber,
        price: Price
    })
    .then(response => {
        if (response.data.success) {
            alert("Data updated successfully");
            setDisplay(false); // Close the modal after updating
        } else {
            alert('Data not updated.');
        }
    })
    .catch(error => {
        alert('Error updating data.');
    });
  };

  // Delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/SupplierTable/delete/${id}`)
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

  // Filter items based on search term
  const filteredItems = items.filter(item => {
    const companyName = item.supplierTable?.companyName?.toLowerCase() || '';
    const supplierType = item.supplierTable?.supplierType?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();
    return companyName.includes(searchTermLower) || supplierType.includes(searchTermLower);
  });

  return (
    <>
      <header></header>
      <div className="suppliercontainer1">
        <h3>Existing Suppliers</h3>
        <button className='supplieraddbtn' onClick={() => navigate('/SupplierForm')}>Add New suppliers</button>
        <input
          type="text"
          className="suppliersearch-bar"
          placeholder="Search by company name or supplier type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <div className='supplierTable'>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Business Registration Number</th>
                <th>Supplier Type</th>
                <th>Product Categories</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.supplierTable?.companyName}</td>
                    <td>{item.supplierTable?.companyAddress}</td>
                    <td>{item.supplierTable?.email}</td>
                    <td>{item.supplierTable?.mobileNumber}</td>
                    <td>{item.supplierTable?.businessRegistrationNumber}</td>
                    <td>{item.supplierTable?.supplierType}</td>
                    <td>{item.supplierTable?.productCategories}</td>
                    <td>{item.supplierTable?.price}</td>
                    <td>
                      <button
                        className='supplieredit'
                        onClick={() => {
                          setDisplay(true);
                          setItemId(item._id);
                          setemail(item.supplierTable.email); // Populate email state
                          setmobileNumber(item.supplierTable.mobileNumber); // Populate mobile number state
                        }}
                      >
                        Edit
                      </button><br></br><br></br>

                      <button className='supplierdelete' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No suppliers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>    
      </div>
      {display && (
        <div className="suppliermodal">
          <div className="suppliermodal-content">
            <span className="supplierclose" onClick={() => setDisplay(false)}>&times;</span>
            <form className='supplierform' onSubmit={(e) => { e.preventDefault(); handleUpdate(itemId); }}>
              <p className='supplierid'>{itemId}</p>
              <p>Email :</p>
              <div className="supplierinput_box">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  className="suppliername"
                  value={Email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <br />
              <p>Mobile Number :</p>
              <div className="supplierinput_box">
                <input
                  type="text"
                  placeholder="Enter your Mobile Number"
                  name="mobileNumber"
                  className="suppliername"
                  value={MobileNumber}
                  onChange={(e) => setmobileNumber(e.target.value)}
                />
              </div>
              <br />
              <p>Price :</p>
              <div className="supplierinput_box">
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="price"
                  className="suppliername"
                  value={Price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <br />
                <button className='supplierupdate' type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default View;