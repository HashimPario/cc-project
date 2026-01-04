import React from "react";

export default function ParsingTable({ table }) {
  const terminals =
    table && Object.keys(table).length > 0
      ? Array.from(
          new Set(
            Object.values(table).flatMap((row) =>
              row ? Object.keys(row) : []
            )
          )
        ).sort((a, b) => {
          // Match typical LL(1) table order used in class notes: +, *, id, (, ), $
          const preferred = ["+", "*", "id", "(", ")", "$"];
          const ia = preferred.indexOf(a);
          const ib = preferred.indexOf(b);
          if (ia !== -1 || ib !== -1) {
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
          }
          return a.localeCompare(b);
        })
      : [];

  return (
    <div>
      <h3>LL(1) Parsing Table</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Non-Terminal</th>
            {terminals.map((term) => (
              <th key={term}>{term}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table &&
            Object.entries(table).map(([nt, row]) => (
            <tr key={nt}>
              <td>{nt}</td>
              {terminals.map((t) => (
                <td key={`${nt}:${t}`}>{row?.[t] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
