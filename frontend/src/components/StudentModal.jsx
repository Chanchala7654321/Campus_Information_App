import { FaTimes, FaEnvelope, FaPhone, FaSchool, FaCalendarAlt } from "react-icons/fa";
import "../styles/StudentModal.css";

export default function StudentModal({ student, onClose }) {
  if (!student) return null;

  // Split skills and projects for display
  const skillsList = student.skills ? student.skills.split(',').map(s => s.trim()) : [];
  
  // Assuming projects is a comma-separated string of "Title: Desc"
  const projectsList = student.projects ? student.projects.split(';').map(p => {
    const [title, ...desc] = p.split(':');
    return { title: title.trim(), desc: desc.join(':').trim() };
  }) : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="student-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Student Details</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-body">
          {/* Profile Section */}
          <div className="profile-summary">
            <img 
              src={student.image_url || "https://via.placeholder.com/100"} 
              alt={student.name} 
              className="profile-avatar" 
            />
            <div className="profile-info">
              <div className="name-status">
                <h1>{student.name}</h1>
                <span className={`status-badge ${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </div>
              <div className="contact-links">
                <p><FaEnvelope /> {student.email}</p>
                <p><FaPhone /> {student.phone || "+1 (555) 000-0000"}</p>
                <p><FaSchool /> {student.school_id?.name || "School of Computer Science"}</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="detail-section">
            <h3>Skills</h3>
            <div className="skills-pills">
              {skillsList.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="detail-section">
            <h3>Projects</h3>
            <div className="projects-container">
              {projectsList.length > 0 ? projectsList.map((proj, i) => (
                <div key={i} className="project-card-mini">
                  <strong>{proj.title}</strong>
                  <p>{proj.desc || "Collaborative project management tool"}</p>
                </div>
              )) : (
                <div className="project-card-mini">
                  <strong>General Project</strong>
                  <p>Comprehensive analysis and implementation of core concepts.</p>
                </div>
              )}
            </div>
          </div>

          {/* Academic Info */}
          <div className="detail-section">
            <h3>Academic Information</h3>
            <div className="academic-grid">
              <div className="academic-card">
                <span className="label">Enrollment Date</span>
                <span className="value">{student.enrollment_date || "2023-01-10"}</span>
              </div>
              <div className="academic-card">
                <span className="label">Graduation Date</span>
                <span className="value">{student.graduation_date || "2024-12-15"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
