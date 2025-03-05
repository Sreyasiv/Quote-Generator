require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Important for JSON body parsing

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Error:", err));

// Quote Schema
const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  tags: [String],
});

const Quote = mongoose.model("Quote", quoteSchema);

// Add Quote API
app.post("/api/quotes/add", async (req, res) => {
  const { quote, author, tags } = req.body;

  const newQuote = new Quote({ quote, author, tags });
  await newQuote.save();
  res.json(newQuote);
});

// Get Random Quote with Keyword
app.get("/api/quotes/random", async (req, res) => {
  const keyword = req.query.keyword;
  let quotes;

  if (keyword) {
    quotes = await Quote.find({ tags: { $in: [new RegExp(keyword, "i")] } });
  } else {
    quotes = await Quote.find();
  }

  if (quotes.length === 0) {
    return res.status(404).json({ message: "No matching quotes found" });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
