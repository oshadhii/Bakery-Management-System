import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ProductBackground.css'

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productCode: '',
    productName: '',
    description: '',
    category: '',
    cost: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}`)
        .then((response) => {
            const fetchedProduct = response.data;
            setProduct({
                productCode: fetchedProduct.productCode || '',
                productName: fetchedProduct.productName || '',
                description: fetchedProduct.description || '',
                category: fetchedProduct.category || '',
                cost: fetchedProduct.cost || ''
            });
        }).catch(err => {
            console.log(err);
        });
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/products/update/${id}`, product).then(() => {
      alert("Product Updated Successfully");
      navigate('/products');
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="ProductcontainerUpdate">
      <h2 style={{ marginBottom: '20px' }}>Update Product</h2><br /><br />
      <form onSubmit={handleSubmit} className="product-update-form">
        <div className="product-update-form-group">
          <label htmlFor="productCode">Product Code</label>
          <input
            type="text"
            id="productCode"
            name="productCode"
            value={product.productCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-update-form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-update-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-update-form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-update-form-group">
          <label htmlFor="cost">Net Cost</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="Product-submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;