


export function computeFirst(grammar) {
  const first = {};
  const nonTerminals = new Set(Object.keys(grammar));
  const isNonTerminal = (sym) => nonTerminals.has(sym);
  const isEpsilon = (sym) => sym === "ε";

  nonTerminals.forEach((nt) => (first[nt] = new Set()));

  const firstOfSymbol = (sym) => {
    if (isEpsilon(sym)) return new Set(["ε"]);
    if (!isNonTerminal(sym)) return new Set([sym]); // terminal
    return first[sym]; // non-terminal
  };

  const firstOfSequence = (seq) => {
    const result = new Set();
    if (!seq || seq.length === 0) {
      result.add("ε");
      return result;
    }

    for (let i = 0; i < seq.length; i++) {
      const symFirst = firstOfSymbol(seq[i]);
      symFirst.forEach((x) => {
        if (x !== "ε") result.add(x);
      });

      if (!symFirst.has("ε")) return result;
    }

    result.add("ε");
    return result;
  };

  let changed = true;
  while (changed) {
    changed = false;
    for (const A of nonTerminals) {
      for (const prod of grammar[A]) {
        const before = first[A].size;
        const prodFirst = firstOfSequence(prod);
        prodFirst.forEach((x) => first[A].add(x));
        if (first[A].size !== before) changed = true;
      }
    }
  }

  return first;
}





