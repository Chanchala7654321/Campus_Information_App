import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function StudentForm({ initialData, onSuccess }) {
  const { token } = useContext(AuthContext);
  const [campuses, setCampuses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    district: "",
    state: "",
    skills: "",
    projects: "",
    placement_info: "",
    school_id: "",
    status: "Active",
    image_url: "",
    phone: "",
    enrollment_date: "",
    graduation_date: "",
  });
  const [message, setMessage] = useState("");

  // Fetch all campuses
  useEffect(() => {
    fetch("https://campus-information-backend.onrender.com/api/campuses")
      .then(res => res.json())
      .then(data => setCampuses(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching campuses:", err));
  }, []);

  // Fetch schools when campus changes
  useEffect(() => {
    if (selectedCampusId) {
      fetch(`https://campus-information-backend.onrender.com/api/schools/campus/${selectedCampusId}`)
        .then(res => res.json())
        .then(data => {
          setSchools(Array.isArray(data) ? data : []);
          // If we are not in edit mode, reset school_id when campus changes
          if (!initialData) setFormData(prev => ({ ...prev, school_id: "" }));
        })
        .catch(err => console.error("Error fetching schools:", err));
    } else {
      setSchools([]);
    }
  }, [selectedCampusId, initialData]);

  // Initial Data Population
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        dob: initialData.dob ? initialData.dob.split('T')[0] : "",
        district: initialData.district || "",
        state: initialData.state || "",
        skills: initialData.skills || "",
        projects: initialData.projects || "",
        placement_info: initialData.placement_info || "",
        school_id: initialData.school_id || "",
        status: initialData.status || "Active",
        image_url: initialData.image_url || "",
        phone: initialData.phone || "",
        enrollment_date: initialData.enrollment_date || "",
        graduation_date: initialData.graduation_date || "",
      });

      // Find campus of the current school
      if (initialData.school_id) {
        fetch(`https://campus-information-backend.onrender.com/api/schools/${initialData.school_id}`)
          .then(res => res.json())
          .then(school => {
            if (school && school.campus_id) setSelectedCampusId(school.campus_id);
          });
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const url = initialData 
      ? `https://campus-information-backend.onrender.com/api/students/${initialData._id}`
      : "https://campus-information-backend.onrender.com/api/students";
    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");
      
      setMessage(`Student ${initialData ? "updated" : "created"} successfully!`);
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="form-card">
      <h2>{initialData ? "Update Student" : "Create Student"}</h2>
      {message && <div className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          
          <div className="form-group">
            <label>Campus *</label>
            <select value={selectedCampusId} onChange={(e) => setSelectedCampusId(e.target.value)} required>
              <option value="">Select Campus</option>
              {campuses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>School *</label>
            <select 
              value={formData.school_id} 
              onChange={(e) => setFormData({...formData, school_id: e.target.value})} 
              required
              disabled={!selectedCampusId}
            >
              <option value="">{selectedCampusId ? "Select School" : "Select Campus First"}</option>
              {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 234-5678" />
          </div>

          <div className="form-group">
            <label>District</label>
            <input value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => {
                const newStatus = e.target.value;
                const update = { status: newStatus };
                if (newStatus === "Placed" && !formData.graduation_date) {
                  update.graduation_date = new Date().toISOString().split('T')[0];
                }
                setFormData({...formData, ...update});
              }}
            >
              <option value="Active">Active</option>
              <option value="Placed">Placed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Enrollment Date</label>
            <input type="date" value={formData.enrollment_date} onChange={(e) => setFormData({...formData, enrollment_date: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
          </div>
        </div>
        
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="React, Node.js, etc." />
        </div>
        <div className="form-group">
          <label>Projects</label>
          <textarea value={formData.projects} onChange={(e) => setFormData({...formData, projects: e.target.value})} />
        </div>
        
        {formData.status === "Placed" && (
          <div className="placement-details-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label>Graduation Date *</label>
              <input 
                type="date" 
                value={formData.graduation_date} 
                onChange={(e) => setFormData({...formData, graduation_date: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Placement Info</label>
              <input 
                value={formData.placement_info} 
                onChange={(e) => setFormData({...formData, placement_info: e.target.value})} 
                placeholder="Company, Package, etc." 
              />
            </div>
          </div>
        )}
        
        <button type="submit" className="btn-primary">
          {initialData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
