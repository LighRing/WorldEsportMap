import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/InteractiveMap.css";
import worldCountries from "../../public/images/assets/data/custom.geo.json";

// Exemple de données de joueurs avec catégories
const playersData = [
  {
    name: "Joueur France",
    country: "France",
    role: "ADC",
    section: "League of Legends",
    year: "2023",
    roster: "Équipe A",
    trophies: ["Trophée A", "Trophée B"],
    photo: "https://via.placeholder.com/100",
  },
  {
    name: "Joueur Allemagne",
    country: "Germany",
    role: "Jungle",
    section: "Valorant",
    year: "2022",
    roster: "Équipe B",
    trophies: ["Trophée X"],
    photo: "https://via.placeholder.com/100",
  },
  {
    name: "Joueur Espagne",
    country: "Spain",
    role: "Mid",
    section: "League of Legends",
    year: "2023",
    roster: "Équipe A",
    trophies: ["Trophée Y"],
    photo: "https://via.placeholder.com/100",
  },
];

// Options pour les filtres
const sections = ["League of Legends", "Valorant"];
const years = ["2023", "2022"];
const rosters = ["Équipe A", "Équipe B"];

const InteractiveMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [filters, setFilters] = useState({ section: "", year: "", roster: "" });

  // Gestion des filtres
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filtrer les joueurs selon les catégories sélectionnées
  const filteredPlayers = playersData.filter((player) => {
    return (
      (filters.section === "" || player.section === filters.section) &&
      (filters.year === "" || player.year === filters.year) &&
      (filters.roster === "" || player.roster === filters.roster)
    );
  });

  // Interaction avec chaque pays
  const onEachCountry = (country, layer) => {
    layer.on({
      mouseover: () => {
        setHoveredCountry(country.properties.name); // Nom du pays
        const countryPlayers = filteredPlayers.filter(
          (player) => player.country === country.properties.name
        );
        if (countryPlayers.length > 0) {
          setHoveredPlayer(countryPlayers[0]); // Premier joueur filtré
        } else {
          setHoveredPlayer(null);
        }
      },
      mouseout: () => {
        setHoveredCountry(null);
        setHoveredPlayer(null);
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

      {/* Carte interactive */}
      <MapContainer center={[20, 0]} zoom={2} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={worldCountries} onEachFeature={onEachCountry} />
      </MapContainer>

      {/* Panneau d'information */}
      {hoveredCountry && (
        <div className="hover-info">
          <h3>Pays : {hoveredCountry}</h3>
          {hoveredPlayer ? (
            <div>
              <img
                src={hoveredPlayer.photo}
                alt={`${hoveredPlayer.name}`}
                className="player-photo"
              />
              <p>Nom : {hoveredPlayer.name}</p>
              <p>Rôle : {hoveredPlayer.role}</p>
              <p>Section : {hoveredPlayer.section}</p>
              <p>Année : {hoveredPlayer.year}</p>
              <h4>Trophées :</h4>
              <ul>
                {hoveredPlayer.trophies.map((trophy, index) => (
                  <li key={index}>{trophy}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Aucun joueur associé.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
