const BASE_URL = "http://localhost:3000/api/quotes";

export async function getRandomQuote(keyword) {
  const response = await fetch(`${BASE_URL}/random?keyword=${keyword}`);
  return response.json();
}

export async function addQuote(quote, author, tags) {
  await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quote, author, tags }),
  });
}
