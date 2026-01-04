import React from "react";

export default function FirstFollow({ first, follow }) {
  return (
    <div>
      <h3>FIRST Sets</h3>
      <pre>{JSON.stringify(Object.fromEntries(
        Object.entries(first).map(([k,v]) => [k, Array.from(v)])
      ), null, 2)}</pre>

      <h3>FOLLOW Sets</h3>
      <pre>{JSON.stringify(Object.fromEntries(
        Object.entries(follow).map(([k,v]) => [k, Array.from(v)])
      ), null, 2)}</pre>
    </div>
  );
}
