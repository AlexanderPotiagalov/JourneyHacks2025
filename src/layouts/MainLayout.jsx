import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div>
      {/* Show Navbar ONLY if NOT on Homepage */}
      {location.pathname !== "/" && <Navbar />}
      <Outlet /> {/* Render page content here */}
    </div>
  );
}
