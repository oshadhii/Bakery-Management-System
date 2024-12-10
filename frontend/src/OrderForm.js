import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SupplierForm.css';

function OrderForm() {
  const [newItem, setNewItem] = useState({
    companyName: '',
    date: '',
    productCategories: '',
    quantity: '',
    price: ''
  });

  const [items, setItems] = useState([]); // List of suppliers
  const [errors, setErrors] = useState({});
  const [quantityPlaceholder, setQuantityPlaceholder] = useState('Enter Quantity');

  // Fetch supplier price based on selected company
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });

    if (name === 'companyName') {
      // Find the selected supplier
      const selectedSupplier = items.find(item => item.supplierTable?.companyName === value);
      if (selectedSupplier) {
        // Update the price based on the selected supplier
        setNewItem(prevState => ({ ...prevState, price: selectedSupplier.supplierTable?.price || '' }));
      }
    }

    if (name === 'productCategories') {
      switch (value) {
        case 'flour':
          setQuantityPlaceholder('Enter quantity in kg');
          break;
        case 'sugar':
          setQuantityPlaceholder('Enter quantity in kg');
          break;
        case 'butter':
          setQuantityPlaceholder('Enter quantity in packets');
          break;
        case 'egg':
          setQuantityPlaceholder('Enter quantity in dozens');
          break;
        case 'yeast':
          setQuantityPlaceholder('Enter quantity in grams');
          break;
        default:
          setQuantityPlaceholder('Enter Quantity');
      }
    }
  };

  const validate = () => {
    let formErrors = {};

    if (!newItem.companyName.trim()) formErrors.companyName = 'Company name is required';
    if (!newItem.date) formErrors.date = 'Order date is required';
    if (!newItem.productCategories) formErrors.productCategories = 'Product category is required';
    if (!newItem.quantity.trim()) {
      formErrors.quantity = 'Quantity is required';
    } else if (!/^\d+$/.test(newItem.quantity) || parseInt(newItem.quantity, 10) <= 0) {
      formErrors.quantity = 'Quantity must be a positive number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .post('http://localhost:8000/Supplierorder/save', { orderTable: newItem })
        .then((response) => {
          if (response.data.success) {
            setItems([...items, response.data.orderTable]);
            setNewItem({
              companyName: '',
              date: '',
              productCategories: '',
              quantity: '',
              price: ''
            });
          } else {
            alert('Failed to add new item');
          }
        })
        .catch((error) => {
          console.error('Error adding order:', error);
        });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/SupplierTable/read')
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.supplier); // Load supplier data
        } else {
          alert('Failed to fetch suppliers');
        }
      })
      .catch((error) => {
        alert('There was an error fetching the suppliers!', error);
      });
  }, []);

  return (
    <div>
      <header></header>
      <div className="suppliercontainer">
        <h2>Order Placements</h2>
        <form className='supplierform' onSubmit={handleFormSubmit}>
        <p>Company Name:</p>
          <div className="supplierinput_box">
            <select
              className="supplierorder_type"
              name="companyName"
              value={newItem.companyName}
              onChange={handleInputChange}
            >
              <option value="">Select Company Name</option>
              {items.map((item) => (
                <option key={item._id} value={item.supplierTable?.companyName}>
                  {item.supplierTable?.companyName}
                </option>
              ))}
            </select>
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <br />

          <p>Order Date:</p>
          <div className="supplierinput_box">
            <input
              type="date"
              name="date"
              className="suppliername"
              value={newItem.date}
              onChange={handleInputChange}
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
          <br />

          <p>Product Categories:</p>
          <div className="supplierinput_box">
            <select
              className="supplierorder_type"
              name="productCategories"
              value={newItem.productCategories}
              onChange={handleInputChange}
            >
              <option value="">Select Product Category</option>
              <option value="flour">Flour</option>
              <option value="sugar">Sugar</option>
              <option value="butter">Butter</option>
              <option value="egg">Egg</option>
              <option value="yeast">Yeast</option>
            </select>
            {errors.productCategories && <p className="error">{errors.productCategories}</p>}
          </div>
          <br />

          <p>Quantity:</p>
          <div className="supplierinput_box">
            <input
              type="text"
              placeholder={quantityPlaceholder}
              name="quantity"
              className="suppliername"
              value={newItem.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>
          <br />

          <p>Price:</p>
          <div className="supplierinput_box">
            <input
              type="text"
              name="price"
              className="suppliername"
              value={newItem.price}
              readOnly
              onChange={handleInputChange}
            />
          </div>
          <br />

          <div className="supplierinput_group">
            <div className="supplierinput_box">
              <button className='supplieradd' type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;