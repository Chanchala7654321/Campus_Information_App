import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCheckCircle } from "react-icons/fa";

export default function StudentCard({ student, onSelect }) {
  const isPlaced = student.status === "Placed";
  const initials = student.name
    ? student.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="student-card" onClick={() => onSelect(student)}>
      <div className="student-card-top">
        {student.image_url ? (
          <img src={student.image_url} alt={student.name} className="student-avatar-img" />
        ) : (
          <div className="student-avatar-placeholder">{initials}</div>
        )}
        <span className={`student-status-badge ${isPlaced ? "placed" : "active"}`}>
          {isPlaced ? <><FaBriefcase /> Placed</> : <><FaCheckCircle /> Active</>}
        </span>
      </div>
      <div className="student-card-body">
        <h4>{student.name}</h4>
        {student.email && (
          <p className="student-meta"><FaEnvelope /> {student.email}</p>
        )}
        {(student.district || student.state) && (
          <p className="student-meta">
            <FaMapMarkerAlt /> {[student.district, student.state].filter(Boolean).join(", ")}
          </p>
        )}
        {student.skills && (
          <div className="student-skills">
            {student.skills.split(",").slice(0, 3).map(s => (
              <span key={s.trim()} className="skill-tag">{s.trim()}</span>
            ))}
          </div>
        )}
        {isPlaced && student.placement_info && (
          <p className="student-placement"><FaBriefcase /> {student.placement_info}</p>
        )}
      </div>
    </div>
  );
}
