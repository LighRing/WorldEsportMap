import React, { useState, useMemo, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { organizations } from '../data/organizations';
import Navbar from './navbar';
import './interactiveMap.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const InteractiveMap = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 20]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const containerRef = useRef(null);

  const filteredOrgs = filterRegion === 'ALL' 
    ? organizations 
    : organizations.filter(org => org.region === filterRegion);

  const getVisibleOrgs = () => {
    return filteredOrgs.filter(org => {
      if (!org.tier || org.tier === 1) return true;
      if (zoom < 4) return false;
      if (zoom < 7) return org.tier <= 2;
      return true;
    });
  };

  const cities = useMemo(() => [
    { name: 'Paris', coordinates: [2.3522, 48.8566], minZoom: 2 },
    { name: 'Berlin', coordinates: [13.4050, 52.5200], minZoom: 2 },
    { name: 'Seoul', coordinates: [126.9780, 37.5665], minZoom: 2 },
    { name: 'Shanghai', coordinates: [121.4737, 31.2304], minZoom: 2 },
    { name: 'Los Angeles', coordinates: [-118.2437, 34.0522], minZoom: 2 },
    { name: 'Lyon', coordinates: [4.8357, 45.7640], minZoom: 4 },
    { name: 'Marseille', coordinates: [5.3698, 43.2965], minZoom: 4 },
    { name: 'Hamburg', coordinates: [9.9937, 53.5511], minZoom: 4 },
    { name: 'Copenhagen', coordinates: [12.5683, 55.6761], minZoom: 4 },
    { name: 'Amsterdam', coordinates: [4.9041, 52.3676], minZoom: 4 },
    { name: 'Toulouse', coordinates: [1.4442, 43.6047], minZoom: 7 },
    { name: 'Bordeaux', coordinates: [-0.5792, 44.8378], minZoom: 7 },
    { name: 'Lille', coordinates: [3.0573, 50.6292], minZoom: 7 },
    { name: 'Nantes', coordinates: [-1.5536, 47.2184], minZoom: 7 },
    { name: 'Strasbourg', coordinates: [7.7521, 48.5734], minZoom: 7 },
  ], []);

  const visibleCities = cities.filter(city => zoom >= city.minZoom);

  const getClusters = useMemo(() => {
    const visibleOrgs = getVisibleOrgs();
    const clusters = [];

    visibleOrgs.forEach(org => {
      org.buildings.forEach(building => {
        const [lon, lat] = building.coordinates;
        const threshold = zoom < 5 ? 0.5 : zoom < 10 ? 0.2 : 0.05;
        
        const existingCluster = clusters.find(c => {
          const distance = Math.sqrt(
            Math.pow(c.centerCoords[0] - lon, 2) + 
            Math.pow(c.centerCoords[1] - lat, 2)
          );
          return distance < threshold;
        });

        if (existingCluster) {
          existingCluster.organizations.push({ org, building });
        } else {
          clusters.push({
            centerCoords: [lon, lat],
            organizations: [{ org, building }]
          });
        }
      });
    });

    return clusters.map(cluster => {
      const shouldSeparate = cluster.organizations.length > 1 && zoom > 12;
      
      if (shouldSeparate) {
        const radius = 0.15 / zoom;
        cluster.organizations = cluster.organizations.map((item, idx) => {
          const angle = (idx / cluster.organizations.length) * 2 * Math.PI;
          return {
            ...item,
            displayCoords: [
              cluster.centerCoords[0] + Math.cos(angle) * radius,
              cluster.centerCoords[1] + Math.sin(angle) * radius
            ]
          };
        });
      } else {
        cluster.organizations = cluster.organizations.map(item => ({
          ...item,
          displayCoords: cluster.centerCoords
        }));
      }
      
      return cluster;
    });
  }, [filteredOrgs, zoom]);

  const getScale = () => {
    return Math.max(0.25, 0.7 / Math.sqrt(zoom));
  };

  const getPinSize = (tier) => {
    const baseSize = tier === 1 ? 5 : tier === 2 ? 3.5 : 2.5;
    return baseSize * getScale();
  };

  const getTextSize = (tier) => {
    const baseSize = tier === 1 ? 11 : tier === 2 ? 9 : 7;
    return baseSize * getScale();
  };

  const getClusterSize = (count) => {
    return Math.max(7, 5 + count * 1.2) * getScale();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 30));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 1));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    
    if (delta < 0) {
      setZoom(prev => Math.min(prev * 1.1, 30));
    } else {
      setZoom(prev => Math.max(prev / 1.1, 1));
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.org-details') || e.target.closest('.zoom-controls')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, center: [...center] });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    const sensitivity = 0.2 / zoom;
    
    setCenter([
      dragStart.center[0] - dx * sensitivity,
      dragStart.center[1] + dy * sensitivity
    ]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleClusterClick = (cluster, e) => {
    e.stopPropagation();
    
    if (cluster.organizations.length === 1) {
      setSelectedOrg(cluster.organizations[0]);
    } else if (zoom > 12) {
      return;
    } else {
      setSelectedOrg({ isCluster: true, cluster });
    }
  };

  return (
    <>
      <Navbar filterRegion={filterRegion} setFilterRegion={setFilterRegion} />

      <div 
        className="map-container"
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="zoom-controls">
          <button 
            onClick={handleZoomIn}
            className="zoom-btn"
            type="button"
          >
            +
          </button>
          <div className="zoom-level">{zoom.toFixed(1)}x</div>
          <button 
            onClick={handleZoomOut}
            className="zoom-btn"
            type="button"
          >
            −
          </button>
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ 
            scale: 147 * zoom,
            center: center
          }}
          style={{ width: '100%', height: '100vh' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1f2937"
                  stroke="#374151"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#374151', outline: 'none' },
                    pressed: { outline: 'none' }
                  }}
                />
              ))
            }
          </Geographies>

          {visibleCities.map((city, idx) => (
            <Marker key={`city-${idx}`} coordinates={city.coordinates}>
              <circle
                r={1.5 * getScale()}
                fill="#6b7280"
                opacity={0.4}
                style={{ pointerEvents: 'none' }}
              />
              <text
                textAnchor="middle"
                y={-3}
                fill="#9ca3af"
                fontSize={7 * getScale()}
                opacity={0.6}
                style={{ pointerEvents: 'none' }}
              >
                {city.name}
              </text>
            </Marker>
          ))}

          {getClusters.map((cluster, clusterIdx) => {
            const orgsCount = cluster.organizations.length;
            const isSingleOrg = orgsCount === 1;
            const isSeparated = zoom > 12 && orgsCount > 1;

            if (isSeparated) {
              return cluster.organizations.map((item, orgIdx) => (
                <Marker
                  key={`org-separated-${clusterIdx}-${orgIdx}`}
                  coordinates={item.displayCoords}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrg(item);
                  }}
                >
                  <circle
                    r={getPinSize(item.org.tier || 3)}
                    fill={item.building.type === 'headquarters' ? '#ef4444' : '#3b82f6'}
                    stroke="#fff"
                    strokeWidth={Math.max(0.3, 1 * getScale())}
                    data-tooltip-id="org-tooltip"
                    data-tooltip-content={`${item.org.name} - ${item.building.name}`}
                    style={{ cursor: 'pointer' }}
                  />
                  {(item.org.tier === 1 || zoom > 3) && (
                    <text
                      textAnchor="middle"
                      y={-getPinSize(item.org.tier || 3) - 2}
                      fill="#fff"
                      fontSize={getTextSize(item.org.tier || 3)}
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {item.org.name}
                    </text>
                  )}
                </Marker>
              ));
            }

            const { org, building } = cluster.organizations[0];

            return (
              <Marker
                key={`cluster-${clusterIdx}`}
                coordinates={cluster.centerCoords}
                onClick={(e) => handleClusterClick(cluster, e)}
              >
                {isSingleOrg ? (
                  <>
                    <circle
                      r={getPinSize(org.tier || 3)}
                      fill={building.type === 'headquarters' ? '#ef4444' : '#3b82f6'}
                      stroke="#fff"
                      strokeWidth={Math.max(0.3, 1 * getScale())}
                      data-tooltip-id="org-tooltip"
                      data-tooltip-content={`${org.name} - ${building.name}`}
                      style={{ cursor: 'pointer' }}
                    />
                    {(org.tier === 1 || zoom > 3) && (
                      <text
                        textAnchor="middle"
                        y={-getPinSize(org.tier || 3) - 2}
                        fill="#fff"
                        fontSize={getTextSize(org.tier || 3)}
                        fontWeight="bold"
                        style={{ pointerEvents: 'none' }}
                      >
                        {org.name}
                      </text>
                    )}
                  </>
                ) : (
                  <>
                    <circle
                      r={getClusterSize(orgsCount)}
                      fill="#8b5cf6"
                      stroke="#fff"
                      strokeWidth={Math.max(0.5, 1.5 * getScale())}
                      opacity={0.9}
                      data-tooltip-id="org-tooltip"
                      data-tooltip-content={`${orgsCount} organisations - Cliquez ou zoomez`}
                      style={{ cursor: 'pointer' }}
                    />
                    <text
                      textAnchor="middle"
                      y={getClusterSize(orgsCount) * 0.15}
                      fill="#fff"
                      fontSize={Math.max(9, 12 * getScale())}
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {orgsCount}
                    </text>
                  </>
                )}
              </Marker>
            );
          })}
        </ComposableMap>

        <Tooltip id="org-tooltip" />

        {selectedOrg && (
          <div className="org-details">
            <button onClick={() => setSelectedOrg(null)} className="close-btn">×</button>

            {selectedOrg.isCluster ? (
              <div className="cluster-list">
                <h2>📍 {selectedOrg.cluster.organizations.length} Organisations</h2>
                <p className="cluster-hint">Zoomez pour séparer les pins automatiquement</p>
                {selectedOrg.cluster.organizations.map(({ org, building }, idx) => (
                  <div 
                    key={idx} 
                    className="cluster-item"
                    onClick={() => setSelectedOrg({ org, building })}
                  >
                    <div className="cluster-item-header">
                      <span style={{ 
                        color: building.type === 'headquarters' ? '#ef4444' : '#3b82f6' 
                      }}>●</span>
                      <h3>{org.name}</h3>
                    </div>
                    <p>{building.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="org-header">
                  <h2>{selectedOrg.org.name}</h2>
                  <span className="org-region">{selectedOrg.org.region}</span>
                </div>

                <div className="building-info">
                  <h3>🏢 {selectedOrg.building.name}</h3>
                  <p>📍 {selectedOrg.building.address}</p>
                  <p className="building-type">
                    {selectedOrg.building.type === 'headquarters' ? '🏛️ Headquarters' : '🎮 Training Facility'}
                  </p>
                </div>

                {selectedOrg.org.teams?.lol && (
                  <div className="team-info">
                    <h3>🎮 League of Legends - {selectedOrg.org.teams.lol.league}</h3>
                    <div className="roster">
                      <h4>Roster:</h4>
                      {selectedOrg.org.teams.lol.roster.map((player, idx) => (
                        <div key={idx} className="player">
                          <span className="player-role">{player.role}</span>
                          <span style={{ color: '#3b82f6' }}>●</span>
                          <span className="player-name">{player.name}</span>
                          <span className="player-flag">{player.nationality}</span>
                        </div>
                      ))}
                    </div>

                    {selectedOrg.org.teams.lol.trophies?.length > 0 && (
                      <div className="trophies">
                        <h4>🏆 Trophies:</h4>
                        <ul>
                          {selectedOrg.org.teams.lol.trophies.map((trophy, idx) => (
                            <li key={idx}>{trophy}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InteractiveMap;
