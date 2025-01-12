import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbarLogo">Esports Map</h1>
      <ul className="navbarLinks">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/clubs">Clubs</Link></li>
        <li><Link to="/competitions">Compétitions</Link></li>
        <li><Link to="/classement">Classement</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
