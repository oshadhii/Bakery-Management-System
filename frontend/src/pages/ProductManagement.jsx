
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../ProductBackground.css';

const ProductManagement = () => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const [existingProducts, setExistingProducts] = useState([]);

  // Fetch existing products to check uniqueness of product code
  useEffect(() => {
    axios.get("http://localhost:8000/products").then((response) => {
      setExistingProducts(response.data);
    });
  }, []);

  const validateForm = () => {
    // Check if product code starts with "P"
    if (!productCode.startsWith("P")) {
      alert("Product code must start with 'P'");
      return false;
    }

    // Check if product code is unique
    const isCodeUnique = !existingProducts.some(product => product.productCode === productCode);
    if (!isCodeUnique) {
      alert("Product code must be unique!");
      return false;
    }

    // Validate other fields (non-empty and cost is a number)
    if (productName === "") {
      alert("Product name is required!");
      return false;
    }

    if (description === "") {
      alert("Product description is required!");
      return false;
    }

    if (category === "") {
      alert("Please select a category!");
      return false;
    }

    if (isNaN(cost) || cost <= 0) {
      alert("Please enter a valid cost!");
      return false;
    }

    return true;
  };

  const sendData = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newProduct = {
        productCode,
        productName,
        description,
        cost,
        category
      };

      axios.post("http://localhost:8000/products/insert", newProduct).then(() => {
        alert('Product Added');
        // Clear form fields
        setProductCode("");
        setProductName("");
        setDescription("");
        setCost("");
        setCategory("");
      }).catch((err) => {
        alert("Something went wrong!", err);
      });
    }
  };

return (
    <div className="Product-modal">
      <div className="Product-modal-header">
        <h2>Product Management</h2>
        <Link to="/" className='no-underline'>
          <button className="close-btn">&#x2716;</button>
        </Link>
      </div>
      <div className="Product-modal-body">
        <h3>Add New Product</h3>
        <form className='Productform' onSubmit={sendData}>
          <div className="Product-form-group">
            <label htmlFor="product-id">Product ID</label>
            <input
              type="text"
              id="product-id"
              placeholder="Enter product ID"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
          <div className="Product-form-group">
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              id="product-name"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="Product-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="Product-form-group">
            <label htmlFor="net-cost">Net Cost</label>
            <input
              type="text"
              id="net-cost"
              placeholder="Enter net cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className="Product-form-group">
            <label htmlFor="category">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
            >
              <option value="">Select category</option>
              <option value="Baked Goods">Baked Goods</option>
              <option value="Cakes">Cakes</option>
              <option value="Doughnuts">Doughnuts</option>
            </select>
          </div>
          <button type="submit" className="Product-save-btn">Save Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;