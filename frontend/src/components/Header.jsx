import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div>
          <div className="logo">Smart Time Table Generator</div>
          <div className="subtitle">Schedule your classes efficiently</div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/instructions" 
                className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >
                Instructions
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
