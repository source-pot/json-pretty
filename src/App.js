import { useMemo, useState } from 'react';
import JsonTree from './JsonTree';
import './App.css';

const TABS = [
  { id: 'input', label: 'Input' },
  { id: 'pretty', label: 'Pretty' },
];

// Parse once per text change; returns either { ok: true, value } or { ok: false, error }.
function parseJson(text) {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, error: 'Paste some JSON into the Input tab.' };
  try {
    return { ok: true, value: JSON.parse(trimmed) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function App() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('input');

  const parsed = useMemo(() => parseJson(text), [text]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">JSON Pretty</h1>
        <p className="description">
          A simple JSON pretty-printer. Paste JSON into the Input tab, then
          switch to Pretty to see it as a collapsible tree. Everything runs in
          your browser — no data is ever stored or sent anywhere.
        </p>
      </header>
      <nav className="tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="panel">
        {activeTab === 'input' ? (
          <textarea
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Paste JSON here, e.g. {"hello": "world"}'
            spellCheck={false}
          />
        ) : parsed.ok ? (
          <div className="pretty">
            <JsonTree value={parsed.value} />
          </div>
        ) : (
          <div className="error">{parsed.error}</div>
        )}
      </main>
    </div>
  );
}

export default App;
