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
    if (!grammar[top]) {
      if (top === currentInput) {
        node.value = currentInput; // mark terminal
        i++;
      } else if (top === 'ε') {
        node.value = 'ε'; // ε production
      } else {
        // terminal mismatch
        return { accepted: false, tree: null };
      }
    }
    // Non-terminal
    else {
      const prodStr = table[top][currentInput];
      if (!prodStr) return { accepted: false, tree: null };

      const prod = prodStr.split(' ');
      const childrenNodes = prod.map(s => ({ value: s, children: [] }));

      // push children in reverse for stack
      for (let j = prod.length - 1; j >= 0; j--) {
        stack.push(prod[j]);
        nodeStack.push(childrenNodes[j]);
      }

      node.children.push(...childrenNodes);
    }
  }

  // accept only if input fully consumed (i points to $) and stack empty
  if (i === input.length - 1 && stack.length === 0) {
    return { accepted: true, tree: treeRoot };
  }

  return { accepted: false, tree: null };
}


