import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="nav-bar3">
      <ul className="nav-list3">
        <li className="nav-item3">
          <NavLink to="/vehicles-drivers" activeClassName="active3" className="nav-link3">
            Vehicles and Drivers
          </NavLink>
        </li>
        <li className="nav-item3">
          <NavLink to="/order-delivery" activeClassName="active3" className="nav-link3">
            Order Delivery
          </NavLink>
        </li>
        <li className="nav-item3">
          <NavLink to="/daily-routes" activeClassName="active3" className="nav-link3">
            Daily Routes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
