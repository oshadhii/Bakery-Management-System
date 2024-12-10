import React, { useState } from 'react';
import axios from 'axios';
import './Inquiry.css';
import { useNavigate } from 'react-router-dom';

function InquiryForm() {

    const navigate = useNavigate();

    const [newItem, setNewItem] = useState({
        Name: '',
        Email: '',
        Phone_Number: '',
        PreferredMethodOfResponse: '',
        QuestionorConcerns: '',
         status:'Pending'
    });

    const [errors, setErrors] = useState({}); // State for storing validation errors
    const [items, setItems] = useState([]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // Validate the form inputs
    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!newItem.Name.trim()) {
            newErrors.Name = 'Name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newItem.Email) {
            newErrors.Email = 'Email is required';
        } else if (!emailRegex.test(newItem.Email)) {
            newErrors.Email = 'Please enter a valid email';
        }

        // Phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!newItem.Phone_Number) {
            newErrors.Phone_Number = 'Phone number is required';
        } else if (!phoneRegex.test(newItem.Phone_Number)) {
            newErrors.Phone_Number = 'Please enter a valid 10-digit phone number';
        }

        // Preferred Method of Response validation
        if (!newItem.PreferredMethodOfResponse) {
            newErrors.PreferredMethodOfResponse = 'Please select a response method';
        }

        // Question or Concerns validation
        if (!newItem.QuestionorConcerns.trim()) {
            newErrors.QuestionorConcerns = 'Please enter your question or concern';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate the form before submission
        if (validate()) {
            axios.post('http://localhost:8000/inquiry/save', { inquiryTable: newItem })
                .then(response => {
                    if (response.data.success) {
                        setItems([...items, response.data.inquiryTable]);
                        setNewItem({
                            Name: '',
                            Email: '',
                            Phone_Number: '',
                            PreferredMethodOfResponse: '',
                            QuestionorConcerns: '',
                             status:'Pending'
                        });
                        alert('Data Added Successfullyy');

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
        <div className='customerinquiry-body'>
            <h1>Inquiry Management</h1>

            <form onSubmit={handleFormSubmit} className="customerinquiry-form">
                <h2>Submit an Inquiry</h2>

                <label className='iName' htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="Name"
                    value={newItem.Name}
                    onChange={handleInputChange}
                />
                {errors.Name && <p className="error">{errors.Name}</p>} {/* Display error */}

                <label htmlFor="iemail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="Email"
                    value={newItem.Email}
                    onChange={handleInputChange}
                />
                {errors.Email && <p className="error">{errors.Email}</p>} {/* Display error */}
                <label htmlFor="iphone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="Phone_Number"
                    value={newItem.Phone_Number}
                    onChange={handleInputChange}
                />
                {errors.Phone_Number && <p className="error">{errors.Phone_Number}</p>} {/* Display error */}

                <label htmlFor="iresponse-method">Preferred Method of Response:</label>
                <select
                    id="response-method"
                    name="PreferredMethodOfResponse"
                    value={newItem.PreferredMethodOfResponse}
                    onChange={handleInputChange}
                >
                    <option value="">Select Response Method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                {errors.PreferredMethodOfResponse && <p className="error">{errors.PreferredMethodOfResponse}</p>} {/* Display error */}

                <label htmlFor="imessage">Question or Concerns:</label>
                <textarea
                    id="message"
                    name="QuestionorConcerns"
                    value={newItem.QuestionorConcerns}
                    onChange={handleInputChange}
                ></textarea>
                {errors.QuestionorConcerns && <p className="error">{errors.QuestionorConcerns}</p>} {/* Display error */}

                <button type="submit">Submit</button><br></br>
            </form>
        </div>
    );
}

export default InquiryForm;