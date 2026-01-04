



export function computeFollow(grammar, first, start) {
  const follow = {};
  Object.keys(grammar).forEach(nt => follow[nt] = new Set());
  follow[start].add('$');

  let changed = true;
  while (changed) {
    changed = false;
    for (const nt in grammar) {
      grammar[nt].forEach(prod => {
        for (let i = 0; i < prod.length; i++) {
          const symbol = prod[i];
          if (!grammar[symbol]) continue; // terminal

          let lookahead = prod.slice(i + 1);
          let added = new Set();

          if (lookahead.length === 0) {
            follow[nt].forEach(x => added.add(x));
          } else {
            for (const la of lookahead) {
              if (!grammar[la]) { // terminal
                added.add(la);
                break;
              } else {
                first[la].forEach(x => { if (x !== 'ε') added.add(x) });
                if (!first[la].has('ε')) break;
              }
            }
            if (lookahead.every(s => grammar[s]?.some(r => r.includes('ε')) || s === 'ε')) {
              follow[nt].forEach(x => added.add(x));
            }
          }

          const sizeBefore = follow[symbol].size;
          added.forEach(x => follow[symbol].add(x));
          if (follow[symbol].size > sizeBefore) changed = true;
        }
      });
    }
  }
  return follow;
}




