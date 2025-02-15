import { useState } from "react";
import axios from "axios";

export default function BioData() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Upload image to backend for processing
  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:7002/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAnalysis(response.data); // Display analysis results
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to analyze image. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-blue-600">
        📸 Upload Profile Image
      </h1>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border rounded w-full"
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Uploaded Preview"
          className="w-48 h-48 object-cover rounded-lg shadow-lg"
        />
      )}

      {/* Upload Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {/* Display Results */}
      {analysis && (
        <div className="mt-4 p-3 border rounded bg-white shadow">
          <h2 className="text-xl font-bold">Analysis Result:</h2>
          <p>
            <strong>Name:</strong> {analysis.name}
          </p>
          <p>
            <strong>Age:</strong> {analysis.age}
          </p>
          <p>
            <strong>Bio:</strong> {analysis.bio}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
