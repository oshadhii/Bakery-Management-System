import React, { useEffect, useState } from 'react';
import './OrderRequest.css';
import Header from './Header.js'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderRequest() {
    const Navigate = useNavigate();
    
    const [orderItems, setOrderItems] = useState([]);
    const [newOrderItems, setNewOrderItems] = useState({
        date: '',
        ingredientCode: '',
        ingredientName: '',
        orderQuantity: '',
    });
    const [errors, setErrors] = useState({});

    const orderHandleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrderItems({ ...newOrderItems, [name]: value });
    };

    const validateForm = () => {
        if (!newOrderItems.date) {
            alert('Date is required');
            return false; // Stop execution if validation fails
        }
    
        if (!newOrderItems.ingredientCode) {
            alert('Ingredient code is required');
            return false;
        }
    
        if (!newOrderItems.ingredientName) {
            alert('Ingredient name is required');
            return false;
        }
    
        if (!newOrderItems.orderQuantity) {
            alert('Order quantity is required');
            return false;
        } else if (isNaN(newOrderItems.orderQuantity) || parseInt(newOrderItems.orderQuantity) <= 0) {
            alert('Order quantity must be a positive number');
            return false;
        }
    
        return true; // Return true if all validation passes
    };
    
    

    const orderHandleForSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // If no errors, proceed to submit
            axios.post('http://localhost:8000/supplierrequest/save', { order: newOrderItems })
                .then(response => {
                    if (response.data.success) {
                        setOrderItems([...orderItems, response.data.order]);
                        setNewOrderItems({ date: '', ingredientCode: '', ingredientName: '', orderQuantity: '' });
                        alert('Successfully added new item');
                        Navigate('/dashboard'); // Navigate after successful submission
                    } else {
                        alert('Failed to add new item');
                    }
                })
                .catch(error => {
                    console.error('There was an error submitting the form:', error);
                    alert('There was an error in adding the item.');
                });
        } else {
            // Set validation errors if any
            setErrors(validationErrors);
        }
    };

    return (
        <>
        <div className='OrderRequest'>
            <div className='addOrder-main'>
                <Header />
                <p className='topic'><b>Place Order Request</b></p>
                <div className='addOrder-body'>
                    <div className='addOrder-topic'></div>
                    <form className='addOrder-form' onSubmit={orderHandleForSubmit}>
                        <p>Date : <br />
                            <input
                                type='date'
                                className='addOrder-input'
                                name='date'
                                value={newOrderItems.date}
                                onChange={orderHandleInputChange}
                            />
                            {errors.date && <span className='error'>{errors.date}</span>}
                        </p>

                        <p>Enter ingredient code : <br />
                            <input
                                type='text'
                                className='addOrder-input'
                                name='ingredientCode'
                                value={newOrderItems.ingredientCode}
                                onChange={orderHandleInputChange}
                            />
                            {errors.ingredientCode && <span className='error'>{errors.ingredientCode}</span>}
                        </p>

                        <p>Enter ingredient name : <br />
                            <input
                                type='text'
                                className='addOrder-input'
                                name='ingredientName'
                                value={newOrderItems.ingredientName}
                                onChange={orderHandleInputChange}
                            />
                            {errors.ingredientName && <span className='error'>{errors.ingredientName}</span>}
                        </p>

                        <p>Enter the stock quantity : <br />
                            <input
                                type='number'
                                className='addOrder-input'
                                name='orderQuantity'
                                value={newOrderItems.orderQuantity}
                                onChange={orderHandleInputChange}
                            />
                            {errors.orderQuantity && <span className='error'>{errors.orderQuantity}</span>}
                        </p>

                        <input type='submit' className='addOrder-btn' value="Submit" /><br />
                        <button
                            type='button'
                            className='cancelBtn'
                            onClick={() => Navigate('/dashboard')}
                        >Cancel</button>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}

export default OrderRequest;