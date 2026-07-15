import { useEffect, useMemo, useState } from "react";
import {
  FaSchool, FaUserGraduate, FaCheckCircle, FaBriefcase,
  FaArrowLeft, FaMapMarkerAlt, FaUsers, FaTimes
} from "react-icons/fa";
import StudentCard from "../components/StudentCard";
import StudentModal from "../components/StudentModal";
import "../styles/SchoolsPage.css";

const API_BASE = "https://campus-information-backend.onrender.com";

export default function Schools() {
  const [campuses, setCampuses] = useState([]);
  const [campusId, setCampusId] = useState(
    () => localStorage.getItem("selectedCampusId") || ""
  );

  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [filter, setFilter] = useState("All");

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [loadingCampuses, setLoadingCampuses] = useState(true);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState("");

  // Fetch campuses
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCampuses(true);
        const res = await fetch(`${API_BASE}/api/campuses`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setCampuses(list);
        if (!campusId && list.length > 0) {
          setCampusId(list[0]._id);
          localStorage.setItem("selectedCampusId", list[0]._id);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingCampuses(false);
      }
    };
    load();
  }, []);

  // Fetch schools when campus changes
  useEffect(() => {
    if (!campusId) return;
    setSelectedSchool(null);
    setStudents([]);
    const load = async () => {
      try {
        setLoadingSchools(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/schools/campus/${campusId}`);
        const data = await res.json();
        setSchools(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingSchools(false);
      }
    };
    load();
  }, [campusId]);

  // Fetch students when school or filter changes
  useEffect(() => {
    if (!selectedSchool) { setStudents([]); return; }
    const load = async () => {
      try {
        setLoadingStudents(true);
        const params = new URLSearchParams({ schoolId: selectedSchool._id, status: filter });
        const res = await fetch(`${API_BASE}/api/students?${params}`);
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingStudents(false);
      }
    };
    load();
  }, [selectedSchool, filter]);

  const selectedCampus = useMemo(() => campuses.find(c => c._id === campusId), [campuses, campusId]);

  const handleCampusChange = (id) => {
    setCampusId(id);
    localStorage.setItem("selectedCampusId", id);
  };

  return (
    <div className="schools-page">

      {/* HERO */}
      <div className="schools-hero">
        {selectedCampus?.image && (
          <img src={selectedCampus.image} alt={selectedCampus.name} className="schools-hero-bg" />
        )}
        <div className="schools-hero-overlay" />
        <div className="schools-hero-content">
          <h1>Schools Directory</h1>
          <p>{selectedCampus ? `Browsing schools at ${selectedCampus.name}` : "Browse schools and their students by campus"}</p>
        </div>
      </div>

      <div className="schools-container">
        {/* CAMPUS SELECTOR */}
        <div className="campus-strip">
          <div>
            <h2 className="campus-strip-title">
              {selectedCampus ? `Schools at ${selectedCampus.name}` : "Schools"}
            </h2>
            <p className="campus-strip-sub">Select a campus to view its schools, then click a school for details.</p>
          </div>
          <div className="campus-select">
            <label htmlFor="campusSelect">Select Campus</label>
            <select
              id="campusSelect"
              value={campusId}
              onChange={(e) => handleCampusChange(e.target.value)}
              disabled={loadingCampuses}
            >
              {campuses.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="error-box"><strong>Error:</strong> {error}</div>}

        {/* SCHOOL DETAIL PANEL */}
        {selectedSchool ? (
          <div className="school-detail-panel">
            <button className="back-btn" onClick={() => setSelectedSchool(null)}>
              <FaArrowLeft /> Back to Schools
            </button>

            <div className="school-detail-header">
              {selectedSchool.image_url ? (
                <img src={selectedSchool.image_url} alt={selectedSchool.name} className="school-detail-img" />
              ) : (
                <div className="school-detail-img-placeholder">
                  <FaSchool />
                </div>
              )}
              <div className="school-detail-info">
                <div className="school-detail-badge">School</div>
                <h2>{selectedSchool.name}</h2>
                <p className="school-detail-campus">
                  <FaMapMarkerAlt /> {selectedCampus?.name}
                </p>
                <p className="school-detail-desc">{selectedSchool.description}</p>
                <div className="school-stat-row">
                  <div className="school-stat-chip">
                    <FaUsers />
                    <span>{students.length} Students</span>
                  </div>
                  <div className="school-stat-chip active">
                    <FaCheckCircle />
                    <span>{students.filter(s => s.status === "Active").length} Active</span>
                  </div>
                  <div className="school-stat-chip placed">
                    <FaBriefcase />
                    <span>{students.filter(s => s.status === "Placed").length} Placed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STUDENTS */}
            <div className="students-section">
              <div className="students-header">
                <h3>Students — {selectedSchool.name}</h3>
                <div className="filters">
                  {["All", "Active", "Placed"].map(f => (
                    <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              {loadingStudents ? (
                <p className="muted">Loading students...</p>
              ) : students.length === 0 ? (
                <p className="muted">No students found for this filter.</p>
              ) : (
                <div className="students-grid">
                  {students.map(student => (
                    <StudentCard key={student._id} student={student} onSelect={setSelectedStudent} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* SCHOOLS GRID */
          <section className="schools-section">
            {loadingSchools ? (
              <p className="muted">Loading schools...</p>
            ) : schools.length === 0 ? (
              <p className="muted">No schools found for this campus.</p>
            ) : (
              <div className="schools-grid">
                {schools.map(school => (
                  <SchoolCard key={school._id} school={school} onClick={() => setSelectedSchool(school)} />
                ))}
              </div>
            )}
          </section>
        )}

        {selectedStudent && (
          <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
        )}
      </div>
    </div>
  );
}

/* ── Inline SchoolCard ─────────────────────────────── */
function SchoolCard({ school, onClick }) {
  return (
    <div className="school-card" onClick={onClick}>
      <div className="school-card-top">
        {school.image_url ? (
          <img src={school.image_url} alt={school.name} className="school-card-img" />
        ) : (
          <div className="school-icon-wrap"><FaSchool /></div>
        )}
        <div className="school-card-badge">View Details →</div>
      </div>
      <div className="school-card-body">
        <h3>{school.name}</h3>
        <p>{school.description}</p>
      </div>
    </div>
  );
}
