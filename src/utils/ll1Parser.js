export function parseString(grammar, table, inputStr, start) {
  // Normalize input string
  const input = inputStr
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
  input.push('$'); // end marker

  const stack = ['$'];
  stack.push(start);

  const treeRoot = { value: start, children: [] };
  const nodeStack = [treeRoot];

  let i = 0;

  while (stack.length > 0) {
    const top = stack.pop();
    const node = nodeStack.pop();
    const currentInput = input[i];

    if (!top || !node) break;

    // Terminal
    if (top === currentInput) {
      node.children.push({ value: currentInput, children: [] });
      i++;
    }
    // Non-terminal in table
    else if (table[top] && table[top][currentInput]) {
      const prod = table[top][currentInput].split(' ');
      const childrenNodes = prod.map(s => ({ value: s, children: [] }));

      // push symbols in reverse for stack
      for (let j = prod.length - 1; j >= 0; j--) {
        if (prod[j] !== 'ε') {
          stack.push(prod[j]);
          nodeStack.push(childrenNodes[j]);
        }
      }

      node.children.push(...childrenNodes);
    }
    else {
      // no matching table entry
      return { accepted: false, tree: null };
    }
  }

  // accept only if input fully consumed and stack empty
  if (i === input.length && stack.length === 0) {
    return { accepted: true, tree: treeRoot };
  }

  return { accepted: false, tree: null };
}


