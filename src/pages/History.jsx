import { useState, useEffect } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("profileHistory")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        📜 Search History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No profiles searched yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {history.map((profile, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
              <p className="text-sm text-gray-400 mt-2">
                🔗{" "}
                <a href={profile.url} className="text-blue-500 hover:underline">
                  View Profile
                </a>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                📅 {profile.timestamp}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
