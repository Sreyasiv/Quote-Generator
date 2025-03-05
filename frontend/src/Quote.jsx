import { useState } from "react";
import axios from "axios";
import "./styles.css";

const Quote = () => {
  const [quote, setQuote] = useState("");

  const getQuote = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/quotes/random");
      setQuote(`${res.data.quote} - ${res.data.author}`);
    } catch (error) {
      setQuote("Error fetching quotes 🚫");
    }
  };

  return (
    <div>
      <h1>Quote Generator 💬</h1>
      <button onClick={getQuote}>Get Quote</button>
      <div className="quote">{quote}</div>
    </div>
  );
};

export default Quote;
