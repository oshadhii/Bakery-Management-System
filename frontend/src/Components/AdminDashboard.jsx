import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-page-header">
        <h1>Bakery Management System - Admin Dashboard</h1>
      </header>

      <div className="admin-dashboard-page-grid">
        <Link to="/products" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Product & Wastage</h2>
            <p>Manage bakery products, track wastage.</p>
          </div>
        </Link>

        <Link to="/suppliers" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Supplier Management</h2>
            <p>Track and manage suppliers.</p>
          </div>
        </Link>

        <Link to="/inventory" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Inventory Management</h2>
            <p>Monitor stock levels and inventory.</p>
          </div>
        </Link>

        <Link to="/orders" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Order Management</h2>
            <p>Handle customer orders and processes.</p>
          </div>
        </Link>

        <Link to="/customers" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Customer Management</h2>
            <p>View and manage customer information.</p>
          </div>
        </Link>

        <Link to="/delivery" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Delivery Management</h2>
            <p>Track delivery status and logistics.</p>
          </div>
        </Link>

        <Link to="/sales" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Sales Reports</h2>
            <p>View and analyze sales data.</p>
          </div>
        </Link>

        <Link to="/employees" className="admin-dashboard-page-card">
          <div className="admin-dashboard-page-card-content">
            <h2>Employee Management</h2>
            <p>Manage employee details and schedules.</p>
          </div>
        </Link>
      </div>

      <footer className="admin-dashboard-page-footer">
        <p>&copy; 2024 Bakery Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
