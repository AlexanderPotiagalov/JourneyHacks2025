import express from "express";
import cors from "cors";
import scrapeProfile from "./scrape.js";

const app = express();
const PORT = 7002;

app.use(cors());
app.use(express.json()); // ✅ Enable JSON request body parsing

// ✅ Accept POST request with the profile URL

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
