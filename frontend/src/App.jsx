import { useState } from "react";
import "./App.css";

const fonts = [
  "Arial, sans-serif",
  "'Courier New', Courier, monospace",
  "'Georgia', serif",
  "'Lucida Sans', 'Lucida Grande', sans-serif",
  "'Times New Roman', Times, serif",
  "'Tahoma', Geneva, sans-serif",
  "'Verdana', Geneva, sans-serif",
];

function App() {
  const [quote, setQuote] = useState("");
  const [keyword, setKeyword] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  async function getQuote() {
    try {
      const res = await fetch(`http://localhost:3001/api/quotes/random?keyword=${keyword}`);
      const data = await res.json();

      if (data.message) {
        setQuote("No matching quotes found 🚫");
      } else {
        setQuote(`${data.quote} - ${data.author}`);
        document.body.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        document.body.style.backgroundColor = randomColor();
      }
    } catch (err) {
      setQuote("Error fetching quotes");
    }
  }

  async function addQuote() {
    try {
      await fetch("http://localhost:3001/api/quotes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: newQuote,
          author: author,
          tags: tags.split(",").map((t) => t.trim()),
        }),
      });
      alert("Quote Added successfully! 🔥");
      setNewQuote("");
      setAuthor("");
      setTags("");
    } catch (err) {
      alert("Error adding quote");
    }
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r},${g},${b})`;
  }

  return (
    <div className="app">
      <h1>Quote Generator</h1>

      {/* Search Keyword */}
      <input
        type="text"
        placeholder="Enter a keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={getQuote}>Get Quote</button>
      <div>{quote}</div>

      {/* Add New Quote */}
      <h2>Add Your Own Quote</h2>
      <input
        type="text"
        placeholder="Quote"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button onClick={addQuote}>Add Quote</button>
    </div>
  );
}

export default App;
