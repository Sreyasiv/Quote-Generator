import { useState } from "react";
import { getRandomQuote } from "./api";

function RandomQuote() {
  const [keyword, setKeyword] = useState("");
  const [quote, setQuote] = useState("");

  async function fetchQuote() {
    const data = await getRandomQuote(keyword);
    setQuote(data.quote ? `${data.quote} - ${data.author}` : "No quotes found");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter keyword"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={fetchQuote}>Get Quote</button>
      <p>{quote}</p>
    </div>
  );
}

export default RandomQuote;
