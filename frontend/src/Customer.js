import React, { useState } from 'react';
import './Customer.css';
import axios from 'axios';

function Customer() {
    const [newItem, setNewItem] = useState({
        name: '',
        Address: '',
        Phone_number: '',
        Email: '',
        user_name: '',
    
    });

    const [errors, setErrors] = useState({});
    const [items, setItems] = useState([]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // Validation function
    const validate = () => {
        let formErrors = {};
        let isValid = true;

        if (!newItem.name) {
            isValid = false;
            formErrors.name = "Name is required";
        }

        if (!newItem.Address) {
            isValid = false;
            formErrors.Address = "Address is required";
        }

        if (!newItem.Phone_number) {
            isValid = false;
            formErrors.Phone_number = "Phone number is required";
        } else if (!/^\d{10}$/.test(newItem.Phone_number)) {
            isValid = false;
            formErrors.Phone_number = "Phone number must be 10 digits";
        }

        if (!newItem.Email) {
            isValid = false;
            formErrors.Email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newItem.Email)) {
            isValid = false;
            formErrors.Email = "Email address is invalid";
        }

        if (!newItem.user_name) {
            isValid = false;
            formErrors.user_name = "User name is required";
        }

        if (!newItem.password) {
            isValid = false;
            formErrors.password = "Password is required";
        }

        setErrors(formErrors);
        return isValid;
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate the form before submission
        if (validate()) {
            axios.post('http://localhost:8000/customer/save', { customer: newItem })
                .then(response => {
                    if (response.data.success) {
                        setItems([...items, response.data.customer]);
                        setNewItem({ name: '', Address: '', Phone_number: '', Email: '', user_name: '', password: '' });
                        setErrors({});
                    } else {
                        alert('Failed to add new customer');
                    }
                })
                .catch(error => {
                    console.error("There was an error adding the customer!", error);
                });
        }
    };

    return (
        <>
        <div className='Customer'>
            <div className="customerCus"></div>
            <div className="customerdet"><h1>Customer Registration</h1></div>

            <div className="customerfm">
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={newItem.name} onChange={handleInputChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                    <br/>

                    <label htmlFor="addrs">Address</label>
                    <input type="text" id="addrs" name="Address" value={newItem.Address} onChange={handleInputChange} />
                    {errors.Address && <span className="error">{errors.Address}</span>}
                    <br/>

                    <label htmlFor="num">Phone number</label>
                    <input type="text" id="num" name="Phone_number" value={newItem.Phone_number} onChange={handleInputChange} />
                    {errors.Phone_number && <span className="error">{errors.Phone_number}</span>}
                    <br/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="Email" value={newItem.Email} onChange={handleInputChange} />
                    {errors.Email && <span className="error">{errors.Email}</span>}
                    <br/>
                    <label htmlFor="uName">User Name</label>
                    <input type="text" id="uName" name="user_name" value={newItem.user_name} onChange={handleInputChange} />
                    {errors.user_name && <span className="error">{errors.user_name}</span>}
                    <br/>

                    <label htmlFor="pWord">Password</label>
                    <input type="password" id="pWord" name="password" value={newItem.password} onChange={handleInputChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <br/>

                    <button type="submit" className="customersubmit-button">Submit</button><br></br>
                </form>
            </div>
            </div>
        </>
    );
}

export default Customer;