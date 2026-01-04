



export function computeFollow(grammar, first, start) {
  const follow = {};
  const nonTerminals = new Set(Object.keys(grammar));
  const isNonTerminal = (sym) => nonTerminals.has(sym);

  nonTerminals.forEach((nt) => (follow[nt] = new Set()));
  follow[start]?.add("$");

  const firstOfSequence = (seq) => {
    const result = new Set();
    if (!seq || seq.length === 0) {
      result.add("ε");
      return result;
    }

    for (let i = 0; i < seq.length; i++) {
      const sym = seq[i];
      if (!isNonTerminal(sym)) {
        result.add(sym);
        return result;
      }

      first[sym].forEach((x) => {
        if (x !== "ε") result.add(x);
      });

      if (!first[sym].has("ε")) return result;
    }

    result.add("ε");
    return result;
  };

  let changed = true;
  while (changed) {
    changed = false;

    for (const A of nonTerminals) {
      for (const prod of grammar[A]) {
        for (let i = 0; i < prod.length; i++) {
          const B = prod[i];
          if (!isNonTerminal(B)) continue;

          const beta = prod.slice(i + 1);
          const betaFirst = firstOfSequence(beta);

          const before = follow[B].size;

          // FIRST(beta) - {ε}
          betaFirst.forEach((x) => {
            if (x !== "ε") follow[B].add(x);
          });

          // if beta =>* ε then add FOLLOW(A)
          if (beta.length === 0 || betaFirst.has("ε")) {
            follow[A].forEach((x) => follow[B].add(x));
          }

          if (follow[B].size !== before) changed = true;
        }
      }
    }
  }

  return follow;
}




