import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/InteractiveMap.css";

// Exemple de données GeoJSON pour les pays
const countriesData = [
  /* Insérez vos données GeoJSON ici */
];

// Exemple de données de joueurs
const playersData = [
  {
    name: "Joueur1",
    country: "France",
    role: "ADC",
    trophies: ["Trophée A", "Trophée B"],
    photo: "https://via.placeholder.com/100",
  },
  {
    name: "Joueur2",
    country: "Allemagne",
    role: "Jungle",
    trophies: ["Trophée X"],
    photo: "https://via.placeholder.com/100",
  },
];

const InteractiveMap = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const onEachCountry = (country, layer) => {
    layer.on({
      mouseover: () => {
        const countryPlayers = playersData.filter(
          (player) => player.country === country.properties.name
        );
        if (countryPlayers.length > 0) {
          setHoveredPlayer(countryPlayers[0]); // Affiche le premier joueur de ce pays
        }
      },
      mouseout: () => {
        setHoveredPlayer(null);
      },
    });
  };

  return (
    <div className="map-container">
      <MapContainer center={[0, 0]} zoom={2} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={countriesData} onEachFeature={onEachCountry} />
      </MapContainer>

      {hoveredPlayer && (
        <div className="player-panel">
          <img
            src={hoveredPlayer.photo}
            alt={`${hoveredPlayer.name}`}
            className="player-photo"
          />
          <h3 className="player-name">{hoveredPlayer.name}</h3>
          <p className="player-info">Pays : {hoveredPlayer.country}</p>
          <p className="player-info">Rôle : {hoveredPlayer.role}</p>
          <h4 className="player-trophies-title">Trophées :</h4>
          <ul className="player-trophies-list">
            {hoveredPlayer.trophies.map((trophy, index) => (
              <li key={index}>{trophy}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
