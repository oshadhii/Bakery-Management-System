import React, { useState, useEffect } from 'react';
import Buttonrow from "./Components/Buttonrow";
import './tables.css';
import { parse, format } from 'date-fns';

function Stables() {
    const [onlineSales, setOnlineSales] = useState([]);
    const [wholesaleSales, setWholesaleSales] = useState([]);                                                                                        
    const [deliverySales, setDeliverySales] = useState([]);

    const [onlineSearchDate, setOnlineSearchDate] = useState('');
    const [wholesaleSearchDate, setWholesaleSearchDate] = useState('');
    const [deliverySearchDate, setDeliverySearchDate] = useState('');

    const fetchOnlineSales = async () => {
        try {
            const response = await fetch('http://localhost:8000/onlineorders');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setOnlineSales(data.data || []);
        } catch (error) {
            console.error('Error fetching online sales:', error);
        }
    };

    const fetchWholesaleSales = async () => {
        try {
            const response = await fetch('http://localhost:8000/wholesaleorders');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setWholesaleSales(data.ReadData || []);
        } catch (error) {
            console.error('Error fetching wholesale sales:', error);
        }
    };

    const fetchDeliverySales = async () => {
        try {
            const response = await fetch('http://localhost:8000/post2');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDeliverySales(data.data || []);
        } catch (error) {
            console.error('Error fetching delivery sales:', error);
        }
    };

    useEffect(() => {
        fetchOnlineSales();
        fetchWholesaleSales();
        fetchDeliverySales();
    }, []);//automatically runs the three functions

    // Helper function to filter sales by date


    const filterSalesByDate = (sales, searchDate, dateKey) => {
        if (!searchDate) return sales;//all data       date the user is searching     This is the key in the sales object that holds the sale's date (for example, 'createdAt' for online sales or 'deliveryDate' for wholesale sales).

        return sales.filter((sale) => {
            const saleDate = new Date(sale[dateKey]).toLocaleDateString();
            return saleDate === new Date(searchDate).toLocaleDateString();
        });
    };

    return (
        <>
            <h1 className="salesmanag">Sales Records By Order Types</h1>
            <Buttonrow />
            <hr  className='saleshr'/>

            {/* Online Sales Table */}
            <div className='salestables'>
            <div className="table1">
                <h6 className="tableheading">Online Sales</h6>

                <div className="search-container">
                    <input
                        type="date"
                        value={onlineSearchDate}
                        onChange={(e) => setOnlineSearchDate(e.target.value)}
                        className="search-input"
                        placeholder="Search by Date"
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Sold Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSalesByDate(onlineSales, onlineSearchDate, 'createdAt').length > 0 ? (
                            filterSalesByDate(onlineSales, onlineSearchDate, 'createdAt').flatMap((order) =>
                                order.OnlineOrder.cartItems.map((item, index) => (
                                    <tr key={`${order._id}-${index}`}>
                                        <td>{item.productName}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>Rs. {item.unitPrice}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="4">No online sales data available for the selected date</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            {/* Wholesale Sales Table */}

            <div className='salestables'>
            <div className="table2">
                <h6 className="tableheading">Wholesale Sales</h6>


                <div className="search-container">
                    <input 
                        type="date"
                        value={wholesaleSearchDate}
                        onChange={(e) => setWholesaleSearchDate(e.target.value)}
                        className="search-input"
                        placeholder="Search by Date"
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
                

                
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSalesByDate(wholesaleSales, wholesaleSearchDate, 'WholesaleOrder.deliveryDate').length > 0 ? (
                            filterSalesByDate(wholesaleSales, wholesaleSearchDate, 'WholesaleOrder.deliveryDate').flatMap((sale) => {
                                const order = sale.WholesaleOrder;
                                return order.products.map((product, index) => (
                                    <tr key={`${sale._id}-${index}`}>
                                        <td>{product.product}</td>
                                        <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                                        <td>Rs. {product.unitPrice}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ));
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No wholesale sales data available for the selected date</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            {/* Delivery Sales Table */}
            <div className='salestables'>
            <div className="table3">
                <h6 className="tableheading">Delivery Sales</h6>
                <div className="search-container">
                    <input
                        type="date"
                        value={deliverySearchDate}
                        onChange={(e) => setDeliverySearchDate(e.target.value)}
                        className="search-input"
                        placeholder="Search by Date"
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSalesByDate(deliverySales, deliverySearchDate, 'dailydelivery.date').length > 0 ? (
                            filterSalesByDate(deliverySales, deliverySearchDate, 'dailydelivery.date').flatMap((sale) => {
                                const order = sale.dailydelivery;
                                return order.products.map((product, index) => (
                                    <tr key={`${sale._id}-${index}`}>
                                        <td>{product.product}</td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>Rs. {product.unitprice}</td>
                                        <td>{product.quantity}</td>
                                        
                                    </tr>
                                    
                                ));
                                
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No delivery sales data available for the selected date</td>
                                <hr/>
                            </tr>
                           
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default Stables;