import { Routes, Route } from "react-router-dom";
import Campus from "../pages/Campus";
import Schools from "../pages/Schools";
import MapView from "../pages/MapView";
import Students from "../pages/Students";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import FAQ from "../pages/FAQ";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Campus />} />
      <Route path="/schools" element={<Schools />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/students" element={<Students />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
