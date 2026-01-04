import React from "react";

export default function GrammarInput({ grammarText, setGrammarText }) {
  return (
    <div>
      <h3>Enter Grammar (Use spaces between symbols, 'eps' for epsilon)</h3>
      <textarea
        rows="6"
        cols="50"
        value={grammarText}
        onChange={e => setGrammarText(e.target.value)}
        placeholder={`Example:\nS -> ( S ) | eps`}
      />
    </div>
  );
}
