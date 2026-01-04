export function buildLL1Table(grammar, first, follow) {
  const table = {};
  const nonTerminals = new Set(Object.keys(grammar));
  const isNonTerminal = (sym) => nonTerminals.has(sym);
  const setCell = (nt, term, production) => {
    if (table[nt][term] == null) {
      table[nt][term] = production;
      return;
    }

    // If there's already an entry and it differs, keep a visible conflict.
    if (table[nt][term] !== production) {
      table[nt][term] = `${table[nt][term]} | ${production}`;
    }
  };
  
  Object.keys(grammar).forEach(nt => {
    table[nt] = {};

    grammar[nt].forEach(prod => {
      const prodStr = prod.join(' ');

      // Compute FIRST of the production
      const prodFirst = new Set();
      if (prod.length === 0) {
        prodFirst.add('ε');
      } else {
        for (let i = 0; i < prod.length; i++) {
          const symbol = prod[i];
          if (symbol === 'ε') {
            prodFirst.add('ε');
            break;
          }

          if (!isNonTerminal(symbol)) { // terminal
            prodFirst.add(symbol);
            break;
          }

          // non-terminal: add FIRST(symbol) - {ε}
          first[symbol].forEach(f => {
            if (f !== 'ε') prodFirst.add(f);
          });

          // if FIRST(symbol) doesn't contain ε, stop
          if (!first[symbol].has('ε')) break;

          // if we reached end and all can derive ε
          if (i === prod.length - 1) prodFirst.add('ε');
        }
      }

      // Add FIRST symbols to table
      prodFirst.forEach(symbol => {
        if (symbol !== 'ε') setCell(nt, symbol, prodStr);
      });

      // If production can generate ε, add entries for FOLLOW(nt)
      if (prodFirst.has('ε')) {
        follow[nt].forEach(f => {
          setCell(nt, f, prodStr);
        });
      }
    });
  });

  return table;
}





