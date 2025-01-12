import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">World Esports Map</h1>
      <ul className="navbar-links">
        <li>
          <button>
            <Link to="/">Accueil</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/clubs">Clubs</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/competitions">Compétitions</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/classement">Classement</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
