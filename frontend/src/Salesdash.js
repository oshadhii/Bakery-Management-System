import React, { useState, useEffect } from 'react';
import Buttonrow from './Components/Buttonrow'
import './tables.css';
import jsPDF from 'jspdf';//generate PDF files directly in the browser
import html2canvas from 'html2canvas';//HTML elements into canvas images.

const API_URL_PRODUCTIONS = 'http://localhost:8000/productions';//This URL is used to fetch or send data related to production
const API_URL_ONLINE_SALES = 'http://localhost:8000/onlineorders';
const API_URL_WHOLESALE_SALES = 'http://localhost:8000/wholesaleorders';
const API_URL_DELIVERY_SALES = 'http://localhost:8000/post2';

function SalesSummaryTable() {
  const [summary, setSummary] = useState([]);// Holds the final sales summary data.
  const [loading, setLoading] = useState(true);//Tracks if the data is being loaded.
  const [error, setError] = useState(null);//Tracks if there’s an error while fetching the data.
  const [onlineSales, setOnlineSales] = useState([]);//Store the fetched sales and production data.
  const [wholesaleSales, setWholesaleSales] = useState([]);
  const [deliverySales, setDeliverySales] = useState([]);
  const [productions, setProductions] = useState([]);

  // Date range for filtering
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Product name search
  const [productSearch, setProductSearch] = useState('');

  // Fetch production details
  const fetchProductions = async () => {
    try {
      const response = await fetch(API_URL_PRODUCTIONS);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProductions(data || []);
    } catch (error) {
      console.error('Error fetching productions:', error);
      setError('Error fetching productions');
    }
  };

  // Fetch online orders
  const fetchOnlineSales = async () => {
    try {
      const response = await fetch(API_URL_ONLINE_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setOnlineSales(data.data || []);
    } catch (error) {
      console.error('Error fetching online sales:', error);
      setError('Error fetching online sales');
    }
  };

  // Fetch wholesale orders
  const fetchWholesaleSales = async () => {
    try {
      const response = await fetch(API_URL_WHOLESALE_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setWholesaleSales(data.ReadData || []);
    } catch (error) {
      console.error('Error fetching wholesale sales:', error);
      setError('Error fetching wholesale sales');
    }
  };

  // Fetch delivery orders
  const fetchDeliverySales = async () => {
    try {
      const response = await fetch(API_URL_DELIVERY_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDeliverySales(data.data || []);
    } catch (error) {
      console.error('Error fetching delivery sales:', error);
      setError('Error fetching delivery sales');
    }
  };

    //download pdf
    const handleDownloadPDF = () => {
      const input = document.querySelector(".salestables"); // Target the table element
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 page width in mm
        const pageHeight = 295; // A4 page height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
    
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
    
        pdf.save("sales-summary.pdf");
      });
    };

  useEffect(() => {
    fetchProductions();
    fetchOnlineSales();
    fetchWholesaleSales();
    fetchDeliverySales();
  }, []);

  const calculateSalesSummary = () => {
    return productions.flatMap((production) => {
      return production.products.map((product) => {
        const { productName, quantity: productQuantity, unitPrice: unitCost } = product;

        let soldQuantity = 0;
        let totalEarnings = 0;

        onlineSales.forEach(sale => {
          const cartItems = sale.OnlineOrder?.cartItems || [];
          cartItems.forEach(item => {
            if (String(item.productName) === String(productName)) {
              const quantity = item.quantity || 0;
              const earnings = (item.unitPrice || 0) * quantity;
              soldQuantity += quantity;
              totalEarnings += earnings;
            }
          });
        });

        wholesaleSales.forEach(sale => {
          const products = sale.WholesaleOrder?.products || [];
          products.forEach(item => {
            if (String(item.product) === String(productName)) {
              const quantity = item.quantity || 0;
              const earnings = (item.unitPrice || 0) * quantity;
              soldQuantity += quantity;
              totalEarnings += earnings;
            }
          });
        });

        deliverySales.forEach(delivery => {
          const products = delivery.dailydelivery?.products || [];
          products.forEach(item => {
            if (String(item.product) === String(productName)) {
              const quantity = parseInt(item.quantity, 10) || 0;
              const earnings = parseFloat(item.totalprice) || 0;
              soldQuantity += quantity;
              totalEarnings += earnings;
            }
          });
        });

        const notSoldQuantity = productQuantity - soldQuantity;
        const totalQuantity = productQuantity; 
        const productionCost = productQuantity * unitCost;
        const netEarnings = totalEarnings;
        const profit = totalEarnings - (soldQuantity * unitCost);

        return {
          productID: productName,
          date: production.date,
          productionCost,
          soldQuantity,
          notSoldQuantity,
          totalQuantity, 
          totalEarnings: netEarnings,
          profit
        };
      });
    });
  };

  useEffect(() => {
    if (productions.length > 0 && onlineSales.length > 0 && wholesaleSales.length > 0 && deliverySales.length > 0) {
      const summary = calculateSalesSummary();
      setSummary(summary);
      setLoading(false);
    }
  }, [productions, onlineSales, wholesaleSales, deliverySales]);

  // Function to filter sales by date range and product name
  const filterSalesByDateAndProduct = (salesData) => {
    let filteredData = salesData;
    if (fromDate && toDate) {
      const from = new Date(fromDate).setHours(0, 0, 0, 0);
      const to = new Date(toDate).setHours(23, 59, 59, 999);
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
        return itemDate >= from && itemDate <= to;
      });
    }
    if (productSearch) {
      filteredData = filteredData.filter(item =>
        item.productID.toLowerCase().includes(productSearch.toLowerCase())
      );
    }
    return filteredData;
  };

  const calculateTotals = () => {
    const filteredSummary = filterSalesByDateAndProduct(summary);
    return filteredSummary.reduce(
      (totals, item) => {
        totals.totalEarnings += item.totalEarnings;
        totals.totalProfit += item.profit;
        totals.totalSold += item.soldQuantity;
        totals.totalNotSold += item.notSoldQuantity;
        return totals;
      },
      { totalEarnings: 0, totalProfit: 0, totalSold: 0, totalNotSold: 0 }
    );
  };

  const totals = calculateTotals();

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Format date values
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <h1 className="salesmanag">Sales Summary</h1>
      <Buttonrow />
      <hr className='saleshr'/>

     {/* Date Range and Product Name Search */}
<div className='search-container'>
  {/* Date Range Filter */}
  <div className="date-filter">
    <label>From: </label>
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="search-input"
    />
    <label>To: </label>
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="search-input"
    />
  </div>

  {/* Product Name Search (Moved under Date Range Search) */}
  <div className="search-container" style={{ marginTop: '1rem' }}>
    <label>Product Name: </label>
    <input
      type="text"
      value={productSearch}
      onChange={(e) => setProductSearch(e.target.value)}
      className="search-input"
      placeholder="Search by product name"
    />
  </div>
</div>

      {/* Total Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Earnings</h3>
          <p>{formatCurrency(totals.totalEarnings)}</p>
        </div>
        <div className="card">
          <h3>Total Profit</h3>
          <p>{formatCurrency(totals.totalProfit)}</p>
        </div>
        <div className="card">
          <h3>Total Sold Quantity</h3>
          <p>{totals.totalSold}</p>
        </div>
        <div className="card">
          <h3>Total Not Sold Quantity</h3>
          <p>{totals.totalNotSold}</p>
        </div>
      </div>

      {/* Sales Summary Table */}
      <div className="salestables">
        
        <table className="table5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Total Quantity</th>
              <th>Sold Quantity</th>
              <th>Not Sold Quantity</th>
              <th>Total Earnings</th>
              <th>Production Cost</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8">Error loading data</td>
              </tr>
            ) : (
              filterSalesByDateAndProduct(summary).map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.productID}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{item.soldQuantity}</td>
                  <td>{item.notSoldQuantity}</td>
                  <td>{formatCurrency(item.totalEarnings)}</td>
                  <td>{formatCurrency(item.productionCost)}</td>
                  <td>{formatCurrency(item.profit)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button className="sdeletebutton"onClick={handleDownloadPDF} >
      Download PDF
    </button>
    </>
  );
}

export default SalesSummaryTable;