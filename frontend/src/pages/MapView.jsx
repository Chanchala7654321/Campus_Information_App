import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaSchool, FaSearch, FaChevronRight, FaLocationArrow } from "react-icons/fa";
import "../styles/MapView.css";

const API_BASE = "https://campus-information-backend.onrender.com";

export default function MapView() {
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/campuses`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setCampuses(list);
        if (list.length > 0) {
          const lastId = localStorage.getItem("selectedCampusId");
          const last = list.find(c => c._id === lastId) || list[0];
          setSelectedCampus(last);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedCampus) return;
    fetch(`${API_BASE}/api/schools/campus/${selectedCampus._id}`)
      .then(r => r.json())
      .then(data => setSchools(Array.isArray(data) ? data : []))
      .catch(() => setSchools([]));
  }, [selectedCampus]);

  if (loading) return <div className="map-loading"><div className="spinner"></div></div>;

  const mapUrl = selectedCampus 
    ? `https://maps.google.com/maps?q=${selectedCampus.lat || 22.9734},${selectedCampus.lng || 78.6569}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    : "";

  return (
    <div className="map-view-v2">
      {/* Sidebar Controls */}
      <div className="map-sidebar">
        <div className="sidebar-header">
          <FaLocationArrow className="header-icon" />
          <div>
            <h1>Campus Explorer</h1>
            <p>{campuses.length} Active Locations</p>
          </div>
        </div>

        <div className="campus-scroll-list">
          {campuses.map(c => (
            <div 
              key={c._id} 
              className={`campus-mini-card ${selectedCampus?._id === c._id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCampus(c);
                localStorage.setItem("selectedCampusId", c._id);
              }}
            >
              <div className="card-indicator"></div>
              <div className="card-content">
                <h3>{c.name}</h3>
                <p><FaMapMarkerAlt /> {c.established || 'Premier Location'}</p>
                <div className="card-stats">
                  <span><FaUsers /> {c.students || 0} Students</span>
                </div>
              </div>
              <FaChevronRight className="arrow-icon" />
            </div>
          ))}
        </div>

        {selectedCampus && (
          <div className="selected-campus-details">
            <div className="detail-header">
              <FaSchool />
              <h4>Schools in {selectedCampus.name}</h4>
            </div>
            <div className="school-pill-list">
              {schools.length > 0 ? schools.map(s => (
                <span key={s._id} className="school-pill">{s.name}</span>
              )) : <p className="no-schools">No schools registered yet.</p>}
            </div>
          </div>
        )}
      </div>

      {/* Main Map Area */}
      <div className="map-main-area">
        <div className="map-overlay-stats">
          <div className="overlay-stat">
            <strong>{selectedCampus?.name}</strong>
            <span>Active Campus</span>
          </div>
          <div className="overlay-stat">
            <strong>{schools.length}</strong>
            <span>Total Schools</span>
          </div>
        </div>

        <iframe
          title="Campus Map"
          className="google-map-frame"
          src={mapUrl}
          loading="lazy"
          allowFullScreen
        ></iframe>

        <div className="map-footer-hint">
          <p>Interactive Map View v2.0 • Data Synced with Global HQ</p>
        </div>
      </div>
    </div>
  );
}
