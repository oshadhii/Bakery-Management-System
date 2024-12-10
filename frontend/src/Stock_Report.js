import React, { useEffect, useState } from 'react';
import './Stock_Report.css'; // Ensure your CSS file is properly imported
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Stock_Report() {

  const Navigate = useNavigate();


  const [items, setItems] = useState([]);
  const [totalAvailableStocks, setTotalAvailableStocks] = useState(0);
  const [totalStockCost, setTotalStockCost] = useState(0);

  const calculateItemCost = (availableQuantity, price) => {
    const available = Number(availableQuantity);
    const unitPrice = Number(price);
    const totalItemPrice = available * unitPrice;
    return totalItemPrice;
  };

  useEffect(() => {
    // Fetch posts from the backend
    axios
      .get('http://localhost:8000/inventory')
      .then((response) => {
        if (response.data.success) {
          const updatedItems = response.data.existingPosts.map((item) => ({
            ...item,
            itemCost: calculateItemCost(
              item.inventory.addQuantity,
              item.inventory.unitPrice
            ),
          }));

          setItems(updatedItems);

          // Calculate totals after setting the items
          const totalAvailable = updatedItems.reduce(
            (sum, item) => sum + Number(item.inventory.addQuantity),
            0
          );
          const totalCost = updatedItems.reduce(
            (sum, item) => sum + item.itemCost,
            0
          );

          setTotalAvailableStocks(totalAvailable);
          setTotalStockCost(totalCost);
        } else {
          alert('Failed to fetch posts');
        }
      })
      .catch((error) => {
        alert('There was an error fetching the posts!', error);
      });
  }, []);

  return (
    <div className='stockReport'>
    <div className="report-containerInventory">
      <h1>Warehouse Ingredient Report</h1>

      <table className="report-table">
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Unit Price</th>
            <th>Available Quantity</th>
            <th>Total Stock Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.inventory?.itemName}</td>
              <td>Rs. {item.inventory?.unitPrice}</td>
              <td>{item.inventory?.addQuantity}</td>
              <td><b>Rs.{item.itemCost}</b></td>
            </tr>
          ))}
        </tbody>
      </table><br/>

      {/* Display Total Stocks and Total Cost */}
      <div className="report-summary">
        <h3>
          Total Available Stocks: <span>{totalAvailableStocks}</span>
        </h3>
        <h3>
          Total Stock Cost: <span>Rs.{totalStockCost}</span>
        </h3>
      </div>

      <button className="generate-btn" onClick={() => Navigate('/dashboard')}>Back to Dashboard</button>
    </div>
    </div>
  );
}

export default Stock_Report;

