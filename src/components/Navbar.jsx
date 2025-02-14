import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white shadow-md">
      <div className="flex justify-center space-x-6 text-lg font-semibold">
        <Link to="/red-flags" className="hover:text-gray-200">
          🚩 Red Flag Detector
        </Link>
        <Link to="/history" className="hover:text-gray-200">
          📜 History
        </Link>
        <Link to="/pickup-lines" className="hover:text-gray-200">
          💬 Pickup Lines
        </Link>
        <Link to="/gifts" className="hover:text-gray-200">
          🎁 Date/Gift Ideas
        </Link>
      </div>
    </nav>
  );
}
