import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation

export default function PerspectiveAnalysis() {
  const location = useLocation();
  const profile = location.state?.profile; // Access profile data
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyzeProfile = async () => {
      if (!profile || !profile.bio) {
        setError("No bio data available for analysis.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:7002/analyze-bio", {
          bio: profile.bio,
        });

        setAnalysisResults(response.data.scores);
      } catch (error) {
        console.error("Error analyzing bio:", error);
        setError("Failed to analyze bio. Try again later.");
      }
      setLoading(false);
    };

    analyzeProfile();
  }, [profile]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-blue-600">
        🔍 Perspective API Analysis
      </h1>

      {/* Display Profile Details */}
      <div className="mt-4 p-3 border rounded bg-white shadow">
        <p>
          <strong>Name:</strong> {profile?.name || "N/A"}
        </p>
        <p>
          <strong>Age:</strong> {profile?.age || "N/A"}
        </p>
        <p>
          <strong>Bio:</strong> {profile?.bio || "N/A"}
        </p>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-600">Analyzing bio...</p>}

      {/* Error State */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Display Analysis Results */}
      {analysisResults && (
        <div className="mt-4 p-3 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">Analysis Results:</h2>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
