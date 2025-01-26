import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/interactiveMap.css";
import geoJsonData from "../../public/images/assets/data/custom.geo.json"; // Fichier GeoJSON des pays

// Liste des clubs par pays
const countriesWithClubs = [
  { country: "France", clubs: ["Team Vitality", "Karmine Corp", "LDLC OL"] },
  { country: "Germany", clubs: ["G2 Esports", "BIG", "MOUZ"] },
  { country: "Ukraine", clubs: ["Na'Vi (Natus Vincere)"] },
  { country: "Spain", clubs: ["Team Heretics", "Movistar Riders"] },
  { country: "Denmark", clubs: ["Astralis", "Heroic"] },
  // Ajoutez plus de pays et de clubs ici si nécessaire
];

const defaultStyle = {
  fillColor: "transparent", // Pas de couleur de remplissage par défaut
  fillOpacity: 0, // Transparence totale par défaut
  weight: 1, // Épaisseur de la bordure
  color: "#cccccc", // Couleur de bordure grise
};

const hoverStyle = {
  fillColor: "#66b2ff", // Couleur de remplissage au survol
  fillOpacity: 0.7, // Transparence au survol
  weight: 2, // Épaisseur de la bordure au survol
  color: "#003366", // Couleur de bordure au survol
};

const bounds = [
  [-90, -180], // Sud-Ouest (latitude minimale, longitude minimale)
  [90, 180],   // Nord-Est (latitude maximale, longitude maximale)
];

const InteractiveMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredClubs, setHoveredClubs] = useState([]);

  // Fonction pour rendre chaque pays interactif
  const onEachCountry = (country, layer) => {
    layer.on({
      mouseover: () => {
        const countryData = countriesWithClubs.find(
          (c) => c.country === country.properties.name
        );
        setHoveredCountry(country.properties.name);
        setHoveredClubs(countryData ? countryData.clubs : []);

        // Applique un style spécifique lorsque la souris survole un pays
        layer.setStyle(hoverStyle);
      },
      mouseout: () => {
        setHoveredCountry(null);
        setHoveredClubs([]);

        // Réinitialise le style par défaut lorsque la souris quitte le pays
        layer.setStyle(defaultStyle);
      },
    });
  };

  return (
    <div className="mapContainer">
      <MapContainer
        center={[20, 10]} // Centre initial de la carte
        zoom={2.3} // Zoom initial
        minZoom={2.3} // Zoom minimal
        maxZoom={10} // Zoom maximal
        className="leafletMap"
        maxBounds={bounds} // Limite de déplacement
        maxBoundsViscosity={1.0} // Viscosité pour empêcher le déplacement hors limites
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachCountry}
          style={defaultStyle} // Applique le style par défaut
        />
      </MapContainer>

      {hoveredCountry && (
        <div className="hoverInfo">
          <h3>Pays : {hoveredCountry}</h3>
          {hoveredClubs.length > 0 ? (
            <ul>
              {hoveredClubs.map((club, index) => (
                <li key={index}>{club}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun club répertorié.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
