import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function GalleryForm({ initialData, onSuccess }) {
  const { token } = useContext(AuthContext);
  const [campuses, setCampuses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "General",
    campus_id: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/campuses")
      .then(res => res.json())
      .then(data => setCampuses(data))
      .catch(err => console.error("Error fetching campuses:", err));

    if (initialData) {
      setFormData({
        title: initialData.title || "",
        image_url: initialData.image_url || "",
        category: initialData.category || "General",
        campus_id: initialData.campus_id || ""
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const url = initialData 
      ? `http://localhost:5000/api/gallery/${initialData._id}`
      : "http://localhost:5000/api/gallery";
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
      
      setMessage(`Gallery item ${initialData ? "updated" : "added"} successfully!`);
      if (onSuccess) onSuccess();
      if (!initialData) {
        setFormData({ title: "", image_url: "", category: "General", campus_id: "" });
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="form-card">
      <h2>{initialData ? "Update Gallery Item" : "Add Gallery Item"}</h2>
      {message && <div className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Image URL *</label>
          <input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="General">General</option>
            <option value="Campus">Campus</option>
            <option value="Event">Event</option>
            <option value="Student Life">Student Life</option>
          </select>
        </div>
        <div className="form-group">
          <label>Related Campus</label>
          <select value={formData.campus_id} onChange={(e) => setFormData({...formData, campus_id: e.target.value})}>
            <option value="">None</option>
            {campuses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn-primary">
          {initialData ? "Update" : "Add to Gallery"}
        </button>
      </form>
    </div>
  );
}
