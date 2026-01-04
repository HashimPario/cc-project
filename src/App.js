import React, { useState } from "react";
import GrammarInput from "./components/GrammarInput";
import FirstFollow from "./components/FirstFollow";
import ParsingTable from "./components/ParsingTable";
import StringParser from "./components/StringParser";

import { parseGrammar } from "./utils/grammarParser";
import { computeFirst } from "./utils/first";
import { computeFollow } from "./utils/follow";
import { buildLL1Table } from "./utils/table";

export default function App() {
  const [grammarText, setGrammarText] = useState("");
  const [first, setFirst] = useState({});
  const [follow, setFollow] = useState({});
  const [table, setTable] = useState({});
  const [grammarObj, setGrammarObj] = useState({});
  const [startSymbol, setStartSymbol] = useState("");

  const handleParse = () => {
    try {
      const grammar = parseGrammar(grammarText);
      const start = Object.keys(grammar)[0];
      const firstSet = computeFirst(grammar);
      const followSet = computeFollow(grammar, firstSet, start);
      const ll1Table = buildLL1Table(grammar, firstSet, followSet);

      setFirst(firstSet);
      setFollow(followSet);
      setTable(ll1Table);
      setGrammarObj(grammar);
      setStartSymbol(start);
    } catch (err) {
      console.error(err);
      alert("Error parsing grammar. Check format and spaces!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>LL(1) Grammar Visualizer & Parser</h1>
      <GrammarInput grammarText={grammarText} setGrammarText={setGrammarText} />
      <button onClick={handleParse} style={{ margin: "10px", padding: "5px 10px" }}>Parse Grammar</button>

      <FirstFollow first={first} follow={follow} />
      <ParsingTable table={table} />

      {Object.keys(grammarObj).length > 0 && (
        <StringParser grammar={grammarObj} table={table} start={startSymbol} />
      )}
    </div>
  );
}
