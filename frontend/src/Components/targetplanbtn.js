import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function TargetPlan() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({             
    date: '',
    productID: '',  // This will now correspond to the selected product name
    predictedQuantity: '',
  });
  const [addtardet, setAddTarDet] = useState(false);

  const Navigate = useNavigate();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  //code for create 
  // Function to handle form submission with validation
  const handleSubmit = () => {
    // e.preventDefault();

    // Basic validation checks
    if (!newProduct.date || !newProduct.productID || !newProduct.predictedQuantity) {
      window.alert('All fields are required.');
      return;
    }

    if (isNaN(newProduct.predictedQuantity) || Number(newProduct.predictedQuantity) <= 0) {
      window.alert('Predicted Quantity must be a positive number.');
      return;
    }

    // If validation passes, submit the form


    axios
      .post('http://localhost:8000/saleplan/save', { targetPlan: newProduct })
      .then((response) => {
        if (response.data.success) {
          setProduct([...product, response.data.targetPlan]);
          setNewProduct({ date: '', productID: '', predictedQuantity: '' });
          window.alert('Product added successfully!');
        } else {
          window.alert('Failed to add new product.');
        }
      })
      .catch((error) => {
        window.alert('There was an error when adding items.');
      });
  };

  return (
    <>
      <div className="-bmainbtnox">
        <button className="targetplanbutton" onClick={() => setAddTarDet(true)}>
          + Add New Target Plan
        </button>
      </div>
      {addtardet && (
        <form className="tpform" onSubmit={handleSubmit}>
          <div>
            <h1 className='formhaeding'>Target Plan for the Next Week</h1>
          </div>

          <label htmlFor="tpdate">Date:</label>
          <input
            type="date"
            id="tpdate"
            name="date"
            value={newProduct.date}
            onChange={handleInputChange}
          /><br />

          <label htmlFor="productname">Product name:</label>
          <select
            id="productname"
            name="productID"
            value={newProduct.productID}
            onChange={handleInputChange}
          >
            <option value="">Select a product</option>
            <option value="sausage bun">Sausage Bun</option>
            <option value="cheese bun">Cheese Bun</option>
            <option value="chicken bun">Chicken Bun</option>
            <option value="fish bun">Fish Bun</option>
            <option value="egg bun">Egg Bun</option>
          </select><br />

          <label htmlFor="predictedqnty">Predicted Quantity:</label>
          <input
            type="text"
            id="predictedqnty"
            name="predictedQuantity"
            value={newProduct.predictedQuantity}
            onChange={handleInputChange}
          /><br />

          <button type="submit" id="tplan">Save</button>
        </form>
      )}
    </>
  );
}

export default TargetPlan;