import { useState, useEffect } from "react";

export default function PickupLines() {
  const [pickupLines, setPickupLines] = useState([]);

  useEffect(() => {
    const savedPickupLines =
      JSON.parse(localStorage.getItem("aiSuggestions"))?.pickupLines || [];
    setPickupLines(savedPickupLines);
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-pink-100">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        💬 AI Pickup Lines
      </h1>

      {pickupLines.length === 0 ? (
        <p className="text-gray-500">No pickup lines generated yet.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {pickupLines.map((line, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 transition-transform transform hover:scale-105"
            >
              <p className="text-lg text-gray-800">💖 {line}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
