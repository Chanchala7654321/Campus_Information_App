import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SchoolForm({ initialData, onSuccess }) {
  const { token } = useContext(AuthContext);
  const [campuses, setCampuses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    campus_id: "",
    description: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch campuses for dropdown
    fetch("http://localhost:5000/api/campuses")
      .then(res => res.json())
      .then(data => setCampuses(data))
      .catch(err => console.error("Error fetching campuses:", err));

    if (initialData) {
      setFormData({
        name: initialData.name || "",
        campus_id: initialData.campus_id || "",
        description: initialData.description || "",
        image_url: initialData.image_url || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const url = initialData 
      ? `http://localhost:5000/api/schools/${initialData._id}`
      : "http://localhost:5000/api/schools";
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
      
      setMessage(`School ${initialData ? "updated" : "created"} successfully!`);
      if (onSuccess) onSuccess();
      if (!initialData) {
        setFormData({ name: "", campus_id: "", description: "", image_url: "" });
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="form-card">
      <h2>{initialData ? "Update School" : "Create School"}</h2>
      {message && <div className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>School Name *</label>
          <input 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Campus *</label>
          <select 
            value={formData.campus_id} 
            onChange={(e) => setFormData({...formData, campus_id: e.target.value})} 
            required
          >
            <option value="">Select Campus</option>
            {campuses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            value={formData.image_url} 
            onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
          />
        </div>
        <button type="submit" className="btn-primary">
          {initialData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
