import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ filterRegion, setFilterRegion }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎮</span>
        <h1>Esport Organizations Map</h1>
      </div>
      
      <div className="navbar-filters">
        <button 
          className={`filter-btn ${filterRegion === 'ALL' ? 'active-filter' : ''}`}
          onClick={() => setFilterRegion('ALL')}
        >
          🌍 ALL
        </button>
        <button 
          className={`filter-btn ${filterRegion === 'EU' ? 'active-filter' : ''}`}
          onClick={() => setFilterRegion('EU')}
        >
          🇪🇺 EU
        </button>
        <button 
          className={`filter-btn ${filterRegion === 'NA' ? 'active-filter' : ''}`}
          onClick={() => setFilterRegion('NA')}
        >
          🇺🇸 NA
        </button>
        <button 
          className={`filter-btn ${filterRegion === 'ASIA' ? 'active-filter' : ''}`}
          onClick={() => setFilterRegion('ASIA')}
        >
          🌏 ASIA
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
