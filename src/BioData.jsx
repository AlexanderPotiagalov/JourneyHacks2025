import { useState } from "react";
import axios from "axios";

export default function BioData() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/scrape-profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching bio data:", error);
      setError("Failed to retrieve profile data. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-blue-600">🔍 Bio Data Scraper</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={fetchBioData}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Bio Data"}
      </button>
      {profile && (
        <div className="mt-4 p-3 border rounded bg-white shadow">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Scraped Bio:</strong> {profile.bio}
          </p>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}