import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "54e7f3205ca940309359fb06ab62cd56"; 



// Route: GET /news?q=technology
app.get("/news", async (req, res) => {
const query = req.query.q || "technology";
const language = req.query.lang || "en";  
const url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&apiKey=${API_KEY}&pageSize=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
