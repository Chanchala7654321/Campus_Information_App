import { useState } from "react";
import CampusForm from "../components/forms/CampusForm";
import SchoolForm from "../components/forms/SchoolForm";
import StudentForm from "../components/forms/StudentForm";
import GalleryForm from "../components/forms/GalleryForm";
import IdentityCheck from "../components/IdentityCheck";

import { 
  FaBuilding, FaSchool, FaUserGraduate, FaImages, 
  FaPlusCircle, FaPen, FaTrash, FaArrowLeft 
} from "react-icons/fa";
import "../styles/Admin.css";

export default function Admin() {
  const [entity, setEntity] = useState(null); // campus, school, student, gallery
  const [action, setAction] = useState(null); // create, update, delete
  const [view, setView] = useState("selection"); // selection, action, check, form
  const [editingItem, setEditingItem] = useState(null);

  const handleEntityClick = (newEntity) => {
    setEntity(newEntity);
    setView("action");
  };

  const handleActionClick = (newAction) => {
    setAction(newAction);
    if (newAction === "create") {
      setView("form");
      setEditingItem(null);
    } else {
      setView("check");
    }
  };

  const handleVerified = (item) => {
    setEditingItem(item);
    setView("form");
  };

  const goBack = () => {
    if (view === "form") {
      if (action === "create") setView("action");
      else setView("check");
    } 
    else if (view === "check") setView("action");
    else if (view === "action") setView("selection");
    else setEntity(null);
  };

  const handleSuccess = () => {
    setView("selection");
    setEntity(null);
    setAction(null);
    setEditingItem(null);
  };

  const renderContent = () => {
    if (view === "selection") {
      return (
        <div className="admin-step">
          <h2 className="section-title">Select Entity</h2>
          <div className="entity-grid">
            <EntityCard label="Campus" icon={<FaBuilding />} active={entity === "campus"} onClick={() => handleEntityClick("campus")} />
            <EntityCard label="School" icon={<FaSchool />} active={entity === "school"} onClick={() => handleEntityClick("school")} />
            <EntityCard label="Student" icon={<FaUserGraduate />} active={entity === "student"} onClick={() => handleEntityClick("student")} />
            <EntityCard label="Gallery" icon={<FaImages />} active={entity === "gallery"} onClick={() => handleEntityClick("gallery")} />
          </div>
        </div>
      );
    }

    if (view === "action") {
      return (
        <div className="admin-step">
          <button className="back-btn" onClick={goBack}><FaArrowLeft /> Change Entity</button>
          <h2 className="section-title">Select Action for {entity}</h2>
          <div className="entity-grid">
            <EntityCard label="Create" icon={<FaPlusCircle />} onClick={() => handleActionClick("create")} />
            <EntityCard label="Update" icon={<FaPen />} onClick={() => handleActionClick("update")} />
            <EntityCard label="Delete" icon={<FaTrash />} onClick={() => handleActionClick("delete")} />
          </div>
        </div>
      );
    }

    if (view === "check") {
      return (
        <div className="admin-step">
          <button className="back-btn" onClick={goBack}><FaArrowLeft /> Back</button>
          <IdentityCheck 
            entity={entity} 
            action={action} 
            onVerified={handleVerified} 
            onCancel={handleSuccess} 
          />
        </div>
      );
    }

    if (view === "form") {
      return (
        <div className="admin-step">
          <button className="back-btn" onClick={goBack}><FaArrowLeft /> Back</button>
          <div className="form-container">
            {entity === "campus" && <CampusForm initialData={editingItem} onSuccess={handleSuccess} />}
            {entity === "school" && <SchoolForm initialData={editingItem} onSuccess={handleSuccess} />}
            {entity === "student" && <StudentForm initialData={editingItem} onSuccess={handleSuccess} />}
            {entity === "gallery" && <GalleryForm initialData={editingItem} onSuccess={handleSuccess} />}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="admin-page">
      <div className="page-hero">
        <h1>Admin Control Panel</h1>
        <p>Identify records to manage your campus data efficiently.</p>
      </div>
      <div className="admin-container">
        {renderContent()}
      </div>
    </div>
  );
}

function EntityCard({ label, icon, active, onClick }) {
  return (
    <div className={`entity-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className="icon-wrapper">{icon}</div>
      <h4>{label}</h4>
    </div>
  );
}
