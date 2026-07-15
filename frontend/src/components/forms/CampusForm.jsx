import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function CampusForm({ initialData, onSuccess }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    established: "",
    image: "",
    students: 0,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        established: initialData.established || "",
        image: initialData.image || "",
        students: initialData.students || 0,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const url = initialData 
      ? `https://campus-information-backend.onrender.com/api/campuses/${initialData._id}`
      : "https://campus-information-backend.onrender.com/api/campuses";
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
      
      setMessage(`Campus ${initialData ? "updated" : "created"} successfully!`);
      if (onSuccess) onSuccess();
      if (!initialData) {
        setFormData({ name: "", description: "", established: "", image: "" });
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="form-card">
      <h2>{initialData ? "Update Campus" : "Create Campus"}</h2>
      {message && <div className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Campus Name *</label>
          <input 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
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
          <label>Established Year *</label>
          <input 
            value={formData.established} 
            onChange={(e) => setFormData({...formData, established: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
          />
        </div>
        <div className="form-group">
          <label>Total Students</label>
          <input 
            type="number"
            value={formData.students} 
            onChange={(e) => setFormData({...formData, students: parseInt(e.target.value) || 0})} 
          />
        </div>
        <button type="submit" className="btn-primary">
          {initialData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
