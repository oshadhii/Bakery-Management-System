import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ProductBackground.css'

const ProductWastageManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const navigate = useNavigate();

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8000/products").then((response) => {
        setProducts(response.data);
      });
    }
    getProducts();
  }, []);

  const deleteProduct = (id) => {
    const confirm = window.confirm("Do you want to Delete?");
    if (confirm) {
      axios.delete(`http://localhost:8000/products/delete/${id}`).then(res => {
        alert("Product Deleted");
        window.location.reload();
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Convert search query to lowercase for case-insensitive search
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery) || 
    product.productCode.toLowerCase().includes(searchQuery) || 
    product.description.toLowerCase().includes(searchQuery) || 
    product.category.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="Productcontainer">
      <div className="Productsidebar">
        <h1>Product &<br />Wastage<br />Management</h1>
        <Link to="/product-management" className="no-underline"><button className="Product-sav-btn">New Product</button></Link><br /><br />
        <Link to="/request-ingredient" className="no-underline"><button className="Product-sav-btn">Ingredient Request</button></Link><br /><br />
        <Link to="/request-staff" className="no-underline"><button className="Product-sav-btn">Staff Request</button></Link>
      </div>
      <div className="Product-main-content">
        <div className="Productheader">
          <input 
            type="text" 
            className="Product-search-bar" 
            placeholder="Search by name, code, description, or category" 
            value={searchQuery} 
            onChange={handleSearchChange} // Handle input change
          />
          <Link to="/product-management" className="no-underline"><button className="Product-header-btn">Add New Product</button></Link>
          <Link to="/dashboard/productreport" className="no-underline"><button className="Product-header-btn">Ingredient Request Details</button></Link>
          <Link to="/request-ingredient" className="no-underline"><button className="Product-header-btn">Ingredient Request</button></Link>
          <Link to="/daily-production" className="no-underline"><button className="Product-header-btn">Daily Production</button></Link>
        </div>
        <div className="Product-table-container">
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Net Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.cost}</td>
                    <td>
                      <button onClick={() => navigateToUpdate(product._id)} className="Product-edit-btn">Edit</button><br /><br />
                      <button onClick={() => deleteProduct(product._id)} className="Product-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductWastageManagement;
