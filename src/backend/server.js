import express from "express";
import cors from "cors";
import scrapeProfile from "./scrape.js"; // ✅ Ensure .js extension

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/scrape-profile", async (req, res) => {
  console.log("Scraping profile...");
  const profileData = await scrapeProfile();
  res.json(profileData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
