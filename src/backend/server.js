import express from "express";
import cors from "cors";
import axios from "axios";
import scrapeProfile from "./scrape.js";

const app = express();
const PORT = 7002;

// Replace with your actual Perspective API key
const PERSPECTIVE_API_KEY = "YOUR_PERSPECTIVE_API_KEY";

app.use(cors());
app.use(express.json());

// Existing routes
app.get("/", (req, res) => {
  res.send("Welcome to the Bio Data Scraper API");
});

app.post("/scrape-profile", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Profile URL is required." });
  }
  console.log(`Scraping profile: ${url}`);
  try {
    const profileData = await scrapeProfile(url);
    res.json(profileData);
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Failed to scrape profile" });
  }
});

// New route for Perspective API analysis
app.post("/analyze-bio", async (req, res) => {
  const { bio } = req.body;

  if (!bio) {
    return res.status(400).json({ error: "Bio is required." });
  }

  try {
    // Perspective API endpoint
    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${PERSPECTIVE_API_KEY}`;
    const requestData = {
      comment: { text: bio },
      languages: ["en"],
      requestedAttributes: {
        TOXICITY: {},
        SEVERE_TOXICITY: {},
        INSULT: {},
        THREAT: {},
        PROFANITY: {},
        IDENTITY_ATTACK: {},
        SEXUALLY_EXPLICIT: {},
        FLIRTATION: {},
      },
    };

    // Send request to Perspective API
    const response = await axios.post(url, requestData);

    // Extract scores from the API response
    const attributeScores = response.data.attributeScores;
    const results = {};

    for (const [attribute, data] of Object.entries(attributeScores)) {
      results[attribute] = data.summaryScore.value;
    }

    res.json({ scores: results });
  } catch (error) {
    console.error("Error analyzing bio:", error.message);
    res.status(500).json({ error: "Failed to analyze bio" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
