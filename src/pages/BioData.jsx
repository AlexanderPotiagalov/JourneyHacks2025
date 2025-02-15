import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function BioData() {
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  const fetchBioData = async () => {
    if (!url.trim()) {
      setError("Please enter a valid profile URL.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:7002/scrape-profile",
        {
          url,
        }
      );
      setProfile(response.data);

      // Redirect to PerspectiveAnalysis page with profile data
      navigate("/perspective-analysis", { state: { profile: response.data } });
    } catch (error) {
      console.error("Error fetching bio data:", error);
      setError("Failed to retrieve profile data. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-blue-600">
        🔍 Tinder Profile Scraper
      </h1>
      <input
        type="text"
        placeholder="Enter Tinder profile URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={fetchBioData}
        disabled={loading}
      >
        {loading ? "Scraping..." : "Get Bio Data"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
