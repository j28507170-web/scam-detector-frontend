'use client';

import { useState } from 'react';

export default function Page() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const scan = async () => {
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Scan failed');

      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (score: number) => {
    if (score > 70) return '#ef4444';
    if (score > 40) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>

      {/* SIDEBAR */}
      <div style={{
        width: '260px',
        background: '#0b1220',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h2>🔒 Scam AI</h2>
        <button style={btn}>🏠 Dashboard</button>
        <button style={btn}>🔍 Scan</button>
        <button style={btn}>📊 History</button>
        <button style={btn}>⚙️ Settings</button>
      </div>

      {/* MAIN */}
      <div style={{
        flex: 1,
        background: '#0f172a',
        color: 'white',
        padding: '30px'
      }}>

        <h1 style={{ fontSize: '28px' }}>
          AI Scam Detection Dashboard
        </h1>

        {/* INPUT CARD */}
        <div style={{
          marginTop: '20px',
          background: '#111827',
          padding: '20px',
          borderRadius: '12px',
          width: '500px'
        }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none'
            }}
          />

          <button
            onClick={scan}
            style={{
              marginTop: '10px',
              padding: '12px',
              width: '100%',
              background: '#22c55e',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Scanning AI...' : 'Run AI Scan'}
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        {/* RESULT */}
        {result && (
          <div style={{
            marginTop: '20px',
            background: '#111827',
            padding: '20px',
            borderRadius: '12px',
            width: '500px'
          }}>
            <h3>Scan Result</h3>

            <div style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: getColor(result.score)
            }}>
              {result.score}/100
            </div>

            <p><b>Risk:</b> {result.risk}</p>
            <p style={{ opacity: 0.8 }}>{result.message}</p>
          </div>
        )}

      </div>
    </div>
  );
}

const btn = {
  padding: '10px',
  background: '#111827',
  color: 'white',
  border: '1px solid #1f2937',
  borderRadius: '8px',
  cursor: 'pointer'
};