


export function computeFirst(grammar) {
  const first = {};
  Object.keys(grammar).forEach(nt => first[nt] = new Set());

  let changed = true;
  while (changed) {
    changed = false;
    for (const nt in grammar) {
      grammar[nt].forEach(prod => {
        for (let i = 0; i < prod.length; i++) {
          const symbol = prod[i];
          if (grammar[symbol]) { // non-terminal
            const sizeBefore = first[nt].size;
            grammar[symbol].forEach(p => {
              p.forEach(s => { if (s !== 'ε') first[nt].add(s) });
            });
            if (prod.every(s => grammar[s]?.some(r => r.includes('ε')) || s === 'ε')) {
              first[nt].add('ε');
            }
            if (first[nt].size > sizeBefore) changed = true;
            break;
          } else { // terminal
            first[nt].add(symbol);
            break;
          }
        }
      });
    }
  }
  return first;
}





