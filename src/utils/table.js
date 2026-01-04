export function buildLL1Table(grammar, first, follow) {
  const table = {};
  Object.keys(grammar).forEach(nt => {
    table[nt] = {};

    grammar[nt].forEach(prod => {
      const prodStr = prod.join(' ');

      // Compute FIRST of the production
      let prodFirst = new Set();

      for (let i = 0; i < prod.length; i++) {
        const symbol = prod[i];
        if (!grammar[symbol]) { // terminal
          prodFirst.add(symbol);
          break;
        } else { // non-terminal
          first[symbol].forEach(f => {
            if (f !== 'ε') prodFirst.add(f);
          });
          if (!first[symbol].has('ε')) break;
        }
        if (i === prod.length - 1) prodFirst.add('ε');
      }

      // Add FIRST symbols to table
      prodFirst.forEach(symbol => {
        if (symbol !== 'ε') table[nt][symbol] = prodStr;
      });

      // If production can generate ε, add entries for FOLLOW(nt)
      if (prodFirst.has('ε')) {
        follow[nt].forEach(f => {
          table[nt][f] = 'ε';
        });
      }
    });
  });

  return table;
}


