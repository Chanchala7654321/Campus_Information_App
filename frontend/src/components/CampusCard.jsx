import { FaCheckCircle } from "react-icons/fa";

export default function CampusCard({ campus, isSelected, onClick }) {
  return (
    <div 
      className={`campus-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="campus-image-container">
        <img src={campus.image} alt={campus.name} />
        {isSelected && (
          <div className="selected-indicator">
            <FaCheckCircle />
          </div>
        )}
      </div>
      <div className="campus-card-content">
        <h3>{campus.name}</h3>
        <p className="campus-desc-truncate">{campus.description}</p>
        <div className="campus-info">
          <span className="est-text">Est. {campus.established}</span>
          <span className="student-count">{campus.students} students</span>
        </div>
      </div>
    </div>
  );
}
