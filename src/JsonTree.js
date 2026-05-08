import { useState } from 'react';
import './JsonTree.css';

// Render a JSON primitive (string/number/boolean/null) with a type-specific class.
function Primitive({ value }) {
  if (value === null) return <span className="json-null">null</span>;
  const type = typeof value;
  if (type === 'string') return <span className="json-string">{JSON.stringify(value)}</span>;
  if (type === 'number') return <span className="json-number">{String(value)}</span>;
  if (type === 'boolean') return <span className="json-boolean">{String(value)}</span>;
  return <span>{String(value)}</span>;
}

// Recursive node: collapsible for objects/arrays, inline for primitives.
function JsonTree({ value, name, isLast = true }) {
  const [open, setOpen] = useState(true);

  const isArray = Array.isArray(value);
  const isObject = value !== null && typeof value === 'object' && !isArray;
  const isContainer = isArray || isObject;

  const label = name !== undefined && (
    <span className="json-key">{JSON.stringify(name)}: </span>
  );
  const comma = isLast ? '' : ',';

  if (!isContainer) {
    return (
      <div className="json-row">
        {label}<Primitive value={value} />{comma}
      </div>
    );
  }

  const entries = isArray
    ? value.map((v, i) => [i, v])
    : Object.entries(value);

  const [openBracket, closeBracket] = isArray ? ['[', ']'] : ['{', '}'];

  if (entries.length === 0) {
    return (
      <div className="json-row">
        {label}<span className="json-bracket">{openBracket}{closeBracket}</span>{comma}
      </div>
    );
  }

  return (
    <div className="json-row">
      <span className="json-toggle" onClick={() => setOpen(!open)}>
        {open ? '▾' : '▸'}
      </span>
      {label}
      <span className="json-bracket">{openBracket}</span>
      {open ? (
        <div className="json-children">
          {entries.map(([k, v], i) => (
            <JsonTree
              key={k}
              name={isArray ? undefined : k}
              value={v}
              isLast={i === entries.length - 1}
            />
          ))}
        </div>
      ) : (
        <span className="json-ellipsis" onClick={() => setOpen(true)}>…</span>
      )}
      <span className="json-bracket">{closeBracket}</span>{comma}
    </div>
  );
}

export default JsonTree;
