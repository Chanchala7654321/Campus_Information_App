import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaUserGraduate } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import CampusCard from "../components/CampusCard";
import "../styles/CampusPage.css"

export default function Campus() {
  const API_BASE = "https://campus-information-backend.onrender.com";
  const navigate = useNavigate();

  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampusId, setSelectedCampusId] = useState(
    () => localStorage.getItem("selectedCampusId") || null
  );

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/campuses`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : [];
        setCampuses(list);
        if (!selectedCampusId && list.length > 0) {
          const firstId = list[0]._id;
          setSelectedCampusId(firstId);
          localStorage.setItem("selectedCampusId", firstId);
        }
      } catch (error) {
        console.error("Error fetching campuses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  const handleSelectCampus = (id) => {
    setSelectedCampusId(id);
    localStorage.setItem("selectedCampusId", id);
  };

  const handleViewSchools = () => {
    navigate("/schools");
  };

  const selectedCampus = campuses.find((c) => c._id === selectedCampusId);

  return (
    <div className="campus-page">
      <HeroSection />

      <section className="campus-list">
        <h2>Select a Campus</h2>
        <p className="campus-subtitle">Choose from our state-of-the-art campuses to view detailed information about schools, students, and facilities</p>

        {loading && <p>Loading campuses...</p>}

        {selectedCampus && (
          <div className="featured-campus-card">
            <img src={selectedCampus.image} alt={selectedCampus.name} className="featured-campus-image" />
            <div className="featured-campus-content">
              <h3>{selectedCampus.name}</h3>
              <p>{selectedCampus.description}</p>
              <div className="featured-stats">
                <div className="stat-box">
                  <div className="stat-icon-wrapper"><FaBuilding /></div>
                  <div className="stat-text">
                    <span className="stat-label">Established</span>
                    <span className="stat-value">{selectedCampus.established}</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon-wrapper"><FaUserGraduate /></div>
                  <div className="stat-text">
                    <span className="stat-label">Total Students</span>
                    <span className="stat-value">{selectedCampus.students}</span>
                  </div>
                </div>
              </div>
              <button className="view-schools-btn" onClick={handleViewSchools}>View Schools →</button>
            </div>
          </div>
        )}

        <h3 className="all-campuses-title">All Our Campuses</h3>

        <div className="grid">
          {campuses.map((campus) => (
            <CampusCard 
              key={campus._id} 
              campus={campus} 
              isSelected={campus._id === selectedCampusId}
              onClick={() => handleSelectCampus(campus._id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}







