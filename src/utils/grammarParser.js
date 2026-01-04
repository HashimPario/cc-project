




// parse grammar input into object
export function parseGrammar(input) {
  const grammar = {};
  input.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    if (!line.includes('->') && !line.includes('→')) return;

    let [lhs, rhs] = line.includes('->') ? line.split('->') : line.split('→');
    lhs = lhs.trim();
    grammar[lhs] = grammar[lhs] || [];

    rhs.split('|').forEach(prod => {
      const symbols = prod.trim().split(/\s+/);
      grammar[lhs].push(
        symbols.map(s => s === 'eps' ? 'ε' : s)
      );
    });
  });

  return grammar;
}



