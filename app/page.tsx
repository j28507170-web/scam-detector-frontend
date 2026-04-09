"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const checkScam = async () => {
    if (!url) return alert("Enter URL");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setResult(data.message || JSON.stringify(data));
    } catch (err) {
      setResult("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🔒 AI Scam Detector</h1>

      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button
        onClick={checkScam}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Check
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}