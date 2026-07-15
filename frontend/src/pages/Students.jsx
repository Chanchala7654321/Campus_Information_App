import { useEffect, useState } from "react";
import { FaUsers, FaCheckCircle, FaBriefcase, FaFilter } from "react-icons/fa";
import StudentCard from "../components/StudentCard";
import StudentModal from "../components/StudentModal";
import "../styles/StudentsPage.css";

const API_BASE = "http://localhost:5000";

export default function Students() {
  const [campuses, setCampuses] = useState([]);
  const [campusId, setCampusId] = useState(() => localStorage.getItem("selectedCampusId") || "");
  const [filter, setFilter] = useState("All");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load campuses
  useEffect(() => {
    fetch(`${API_BASE}/api/campuses`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setCampuses(list);
        if (!campusId && list.length > 0) {
          setCampusId(list[0]._id);
        }
      })
      .catch(() => {});
  }, []);

  // Load students by campus (via schools lookup)
  useEffect(() => {
    if (!campusId) return;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        // Get all schools for this campus, then get all students for those schools
        const schoolsRes = await fetch(`${API_BASE}/api/schools/campus/${campusId}`);
        const schools = await schoolsRes.json();
        if (!Array.isArray(schools) || schools.length === 0) {
          setStudents([]);
          return;
        }
        // Fetch students for all schools in parallel
        const allStudents = await Promise.all(
          schools.map(school => {
            const params = new URLSearchParams({ schoolId: school._id });
            if (filter !== "All") params.set("status", filter);
            return fetch(`${API_BASE}/api/students?${params}`).then(r => r.json());
          })
        );
        setStudents(allStudents.flat());
      } catch {
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [campusId, filter]);

  const selectedCampusName = campuses.find(c => c._id === campusId)?.name || "";
  const activeCount = students.filter(s => s.status === "Active").length;
  const placedCount = students.filter(s => s.status === "Placed").length;

  return (
    <div className="students-page">
      {/* Hero */}
      <div className="students-hero">
        <div className="students-hero-content">
          <h1>Students Directory</h1>
          <p>{selectedCampusName ? `Viewing students at ${selectedCampusName}` : "Browse all students across campuses"}</p>
          <div className="students-hero-stats">
            <div className="hero-stat"><FaUsers /><span>{students.length} Total</span></div>
            <div className="hero-stat active"><FaCheckCircle /><span>{activeCount} Active</span></div>
            <div className="hero-stat placed"><FaBriefcase /><span>{placedCount} Placed</span></div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="students-toolbar">
        <div className="toolbar-select">
          <label htmlFor="campus-filter"><FaFilter /> Campus</label>
          <select
            id="campus-filter"
            value={campusId}
            onChange={e => { setCampusId(e.target.value); localStorage.setItem("selectedCampusId", e.target.value); }}
            disabled={campuses.length === 0}
          >
            {campuses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div className="toolbar-filters">
          {["All", "Active", "Placed"].map(f => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && <div className="students-error">{error}</div>}

      {/* Grid */}
      <div className="students-container">
        {loading ? (
          <div className="students-loading">
            <div className="loading-spinner" />
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="students-empty">
            <FaUsers />
            <h3>No students found</h3>
            <p>Add students through the Admin panel or adjust your filters.</p>
          </div>
        ) : (
          <div className="students-grid">
            {students.map(student => (
              <StudentCard key={student._id} student={student} onSelect={setSelectedStudent} />
            ))}
          </div>
        )}
      </div>

      {selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
