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
        layer.setStyle({ fillColor: "#66b2ff", fillOpacity: 0.7 }); // Style survolé
      },
      mouseout: () => {
        setHoveredCountry(null);
        setHoveredClubs([]);
        layer.setStyle({ fillColor: "#cce5ff", fillOpacity: 1 }); // Style par défaut
      },
    });
  };

  return (
    <div className="mapContainer">
      <MapContainer center={[20, 10]} zoom={2} className="leafletMap">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={geoJsonData} onEachFeature={onEachCountry} />
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
