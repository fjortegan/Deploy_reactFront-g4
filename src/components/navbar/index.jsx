import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import { UserContext } from '../../context/userContext';

const Navbar = () => {
  const { logout, user } = useContext(UserContext); 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };
  
  return (
    <header className="header">
      <div className="logo">Grupo 4 Company</div>
      <nav className="nav">
        <NavLink to="/api/options" className="nav-link">OPTIONS</NavLink>
        <NavLink to="/api/delete" className="nav-link">DELETE</NavLink>
        <NavLink to="/api/get" className="nav-link">GET</NavLink>
        <NavLink to="/api/put" className="nav-link">PUT</NavLink>
        <NavLink to="/api/patch" className="nav-link">PATCH</NavLink>
        <NavLink to="/api/post" className="nav-link">POST</NavLink>
      </nav>
      {user && (
        <button onClick={handleLogout} className='logout'>Logout</button>
      )}
    </header>
  );
};

export default Navbar;
