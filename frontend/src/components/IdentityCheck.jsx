import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function IdentityCheck({ entity, action, onVerified, onCancel }) {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Only for students/users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let endpoint = `http://localhost:5000/api/${entity}`;
      if (entity === "campus") endpoint = "http://localhost:5000/api/campuses";
      if (entity === "school" || entity === "student") endpoint += "s";
      const res = await fetch(endpoint);
      const data = await res.json();
      
      // Search for the item manually (or we could have a search endpoint, but this works for small lists)
      const found = data.find(item => {
        const itemName = item.name || item.title || "";
        const nameMatch = itemName.toLowerCase() === name.toLowerCase();
        if (entity === "student") {
          return nameMatch && item.email.toLowerCase() === email.toLowerCase();
        }
        return nameMatch;
      });

      if (!found) {
        throw new Error(`${entity.charAt(0).toUpperCase() + entity.slice(1)} not found with these details.`);
      }

      if (action === "delete") {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${found.name}?`);
        if (confirmDelete) {
          const delRes = await fetch(`${endpoint}/${found._id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (delRes.ok) {
            alert("Deleted successfully!");
            onCancel(); // Go back
          } else {
            throw new Error("Delete failed.");
          }
        }
      } else {
        // action === "update"
        onVerified(found);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card identity-check">
      <div className="check-icon-header">
        <FaUserCircle />
      </div>
      <h2>Identify {entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
      <p>Please enter the details below to {action} the record.</p>
      
      {error && <div className="message error">{error}</div>}
      
      <form onSubmit={handleCheck}>
        <div className="form-group">
          <label>{entity.charAt(0).toUpperCase() + entity.slice(1)} Name</label>
          <input 
            type="text" 
            placeholder="Enter full name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>

        {entity === "student" && (
          <div className="form-group">
            <label>Student Email</label>
            <input 
              type="email" 
              placeholder="Enter email address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
        )}

        <div className="check-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Checking..." : action === "delete" ? "Delete" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
