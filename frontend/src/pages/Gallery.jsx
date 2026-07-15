import { useEffect, useState } from "react";
import { FaImages, FaUniversity, FaExpand, FaTimes } from "react-icons/fa";
import "../styles/Gallery.css";

const API_BASE = "https://campus-information-backend.onrender.com";

export default function Gallery() {
  const [campuses, setCampuses] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState("All");
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campusRes, galleryRes] = await Promise.all([
          fetch(`${API_BASE}/api/campuses`),
          fetch(`${API_BASE}/api/gallery`)
        ]);
        
        const campusData = await campusRes.json();
        const galleryData = await galleryRes.json();
        
        setCampuses(Array.isArray(campusData) ? campusData : []);
        setImages(Array.isArray(galleryData) ? galleryData : []);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedCampusId === "All"
    ? images
    : images.filter(img => img.campus_id === selectedCampusId);

  return (
    <div className="gallery-page">
      {/* Clean Header */}
      <div className="gallery-header-minimal">
        <span className="gallery-label"><FaImages /> Our Gallery</span>
        <h1>Campus Moments</h1>
        <p>Explore the vibrant life and world-class facilities across our campuses.</p>
      </div>

      {/* Modern Filter Strip */}
      <div className="gallery-filter-strip">
        <div className="filter-inner">
          <button 
            className={selectedCampusId === "All" ? "active" : ""} 
            onClick={() => setSelectedCampusId("All")}
          >
            All Photos
          </button>
          {campuses.map(c => (
            <button 
              key={c._id} 
              className={selectedCampusId === c._id ? "active" : ""} 
              onClick={() => setSelectedCampusId(c._id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="gallery-grid-wrapper">
        {loading ? (
          <div className="gallery-loading">
            <div className="loader"></div>
            <p>Gathering memories...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="gallery-empty">
            <FaImages className="empty-icon" />
            <h3>No images found</h3>
            <p>Try selecting another campus or check back later.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map(item => (
              <div key={item._id} className="gallery-item-card" onClick={() => setLightbox(item)}>
                <img src={item.image_url} alt={item.title} loading="lazy" />
                <div className="item-overlay">
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <span className="item-cat">{item.category}</span>
                  </div>
                  <div className="expand-btn"><FaExpand /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="gallery-modal" onClick={() => setLightbox(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLightbox(null)}><FaTimes /></button>
            <div className="modal-img-container">
              <img src={lightbox.image_url} alt={lightbox.title} />
            </div>
            <div className="modal-details">
              <h3>{lightbox.title}</h3>
              <p className="modal-meta">
                {lightbox.category} {lightbox.campus_id && `• ${campuses.find(c => c._id === lightbox.campus_id)?.name}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
