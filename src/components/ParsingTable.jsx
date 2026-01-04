import React from "react";

export default function ParsingTable({ table }) {
  return (
    <div>
      <h3>LL(1) Parsing Table</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Non-Terminal</th>
            {table && Object.keys(table).length > 0 &&
              Array.from(new Set([].concat(...Object.values(table).map(t => Object.keys(t))))).map(term => (
                <th key={term}>{term}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {table && Object.entries(table).map(([nt, row]) => (
            <tr key={nt}>
              <td>{nt}</td>
              {Object.keys(row).map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
