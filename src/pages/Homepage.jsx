import { useState, useEffect } from "react";

export default function Homepage() {
  // State for user inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState(""); // State for success message

  // Load data from Local Storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name);
      setAge(storedUser.age);
      setInterests(storedUser.interests.join(", "));
    }
  }, []);

  // Save data to Local Storage & Clear Fields
  const handleSave = () => {
    const userData = {
      name,
      age,
      interests: interests.split(",").map((item) => item.trim()), // Convert to array
    };

    // Store user data
    localStorage.setItem("user", JSON.stringify(userData));

    // Show success message
    setMessage("✅ Your details have been saved!");

    // Clear input fields
    setName("");
    setAge("");
    setInterests("");

    // Remove message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Enter Your Details</h1>
      {message && <p className="text-green-600 mb-2">{message}</p>}{" "}
      {/* Success message */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 border rounded w-64"
      />
      <input
        type="number"
        placeholder="Your Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mb-2 p-2 border rounded w-64"
      />
      <input
        type="text"
        placeholder="Your Interests (comma-separated)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Details
      </button>
    </div>
  );
}
