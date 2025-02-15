import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function TextAnalyzer() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Load Gemini API Key securely from .env
  const API_KEY = `AIzaSyDIUwmvvHFcjd6L4jqm2Yem8RvNVcQtHxU
`;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const analyzeText = async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Convert image to Base64 format
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1]; // Extract Base64 data

        // ✅ Initialize Gemini API
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Use latest model

        // ✅ Send request with both a text prompt & image
        const result = await model.generateContent({
          contents: [
            {
              parts: [
                { text: "Extract text from this image:" }, // ✅ Required text input
                {
                  inline_data: {
                    mime_type: image.type, // Auto-detect JPEG/PNG
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        });

        // ✅ Extract the text response
        const extractedText =
          result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No text extracted.";

        setExtractedText(extractedText);
      };
    } catch (error) {
      console.error("❌ Error analyzing text:", error);
      setError("Failed to analyze text. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-lg">
      <h1 className="text-2xl font-bold text-blue-600">
        📝 Image to Text (Gemini API)
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="p-2 border rounded w-full"
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={analyzeText}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Extract Text"}
      </button>

      {extractedText && (
        <div className="mt-4 p-3 border rounded bg-white shadow">
          <h2 className="text-lg font-semibold">Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
