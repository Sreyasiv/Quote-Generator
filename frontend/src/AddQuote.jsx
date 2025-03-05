import { useState } from "react";
import { addQuote } from "./api";

function AddQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit() {
    await addQuote(quote, author, tags);
    alert("Quote added successfully!");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Quote"
        onChange={(e) => setQuote(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        onChange={(e) => setTags(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Quote</button>
    </div>
  );
}

export default AddQuote;
