import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/InteractiveMap.css";

// Données fictives
const countriesData = [
  {
    type: "Feature",
    properties: { name: "France" },
    geometry: {
      type: "Polygon",
      coordinates: [[[2.0, 51.0], [3.0, 50.0], [2.0, 49.0], [1.0, 50.0], [2.0, 51.0]]],
    },
  },
];

const playersData = [
  {
    name: "Joueur1",
    country: "France",
    role: "ADC",
    section: "League of Legends",
    year: "2023",
    roster: "Équipe A",
    trophies: ["Trophée A", "Trophée B"],
    photo: "https://via.placeholder.com/100",
  },
  {
    name: "Joueur2",
    country: "Allemagne",
    role: "Jungle",
    section: "Valorant",
    year: "2022",
    roster: "Équipe B",
    trophies: ["Trophée X"],
    photo: "https://via.placeholder.com/100",
  },
];

// Options pour les filtres
const sections = ["League of Legends", "Valorant"];
const years = ["2023", "2022"];
const rosters = ["Équipe A", "Équipe B"];

const InteractiveMap = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [filters, setFilters] = useState({ section: "", year: "", roster: "" });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredPlayers = playersData.filter((player) => {
    return (
      (filters.section === "" || player.section === filters.section) &&
      (filters.year === "" || player.year === filters.year) &&
      (filters.roster === "" || player.roster === filters.roster)
    );
  });

  const onEachCountry = (country, layer) => {
    layer.on({
      // Survol d'un pays
      mouseover: () => {
        const countryPlayers = playersData.filter(
          (player) => player.country === country.properties.name
        );
        if (countryPlayers.length > 0) {
          setHoveredPlayer(countryPlayers[0]); // Affiche les infos du premier joueur
        }
      },
      // Quand la souris quitte le pays
      mouseout: () => {
        setHoveredPlayer(null); // Supprime les infos du joueur
      },
    });
  };
  
  return (
    <div className="map-container">
      {/* Filtres dynamiques */}
      <div className="filters">
        <label>
          Section:
          <select onChange={(e) => handleFilterChange("section", e.target.value)}>
            <option value="">Toutes</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </label>
        <label>
          Année:
          <select onChange={(e) => handleFilterChange("year", e.target.value)}>
            <option value="">Toutes</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label>
          Roster:
          <select onChange={(e) => handleFilterChange("roster", e.target.value)}>
            <option value="">Tous</option>
            {rosters.map((roster) => (
              <option key={roster} value={roster}>
                {roster}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Carte Interactive */}
      <MapContainer center={[0, 0]} zoom={2} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={{ type: "FeatureCollection", features: countriesData }} onEachFeature={onEachCountry} />
      </MapContainer>

      {/* Panneau joueur */}
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
