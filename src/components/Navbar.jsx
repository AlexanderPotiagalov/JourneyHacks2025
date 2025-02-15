import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        {/* Logo with enhanced styling */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white text-2xl font-bold tracking-wide transition-all duration-300 hover:scale-105 group"
        >
          <span className="inline-block group-hover:animate-bounce">💖</span>
          <span className="group-hover:text-pink-200">MatchMate</span>
        </Link>

        {/* Enhanced Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <NavItem to="/biodata" emoji="🧑" text="BioData" />
          <NavItem to="/red-flags" emoji="🚩" text="Red Flags" />
          <NavItem to="/history" emoji="📜" text="History" />
          <NavItem to="/pickup-lines" emoji="💬" text="Pickup Lines" />
          <NavItem to="/gift-ideas" emoji="🎁" text="Gift Ideas" />
          <NavItem to="/date-ideas" emoji="❤️" text="Date Ideas" />{" "}
          <NavItem to="/text-analyse" emoji="❤️" text="Date Ideas" />{" "}
          {/* ✅ Added Date Ideas */}
        </div>
      </div>
    </nav>
  );
}

// ✅ Fix: Use `useLocation()` inside NavItem instead of passing `current`
function NavItem({ to, emoji, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "text-white bg-white/20"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }
      `}
    >
      <span className="inline-block transition-transform duration-300 group-hover:scale-125">
        {emoji}
      </span>
      <span className="relative">
        {text}
        {isActive && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full" />
        )}
      </span>
    </Link>
  );
}
