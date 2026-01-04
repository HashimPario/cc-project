// export default function ParseTree({ node }) {
//   if (!node) return null;

//   return (
//     <ul>
//       <li>
//         <b>{node.value}</b>
//         {node.children.length > 0 && (
//           <ul>
//             {node.children.map((c, i) => (
//               <ParseTree key={i} node={c} />
//             ))}
//           </ul>
//         )}
//       </li>
//     </ul>
//   );
// }



import React from "react";
import Tree from "react-d3-tree";

function convertToTreeD3(node) {
  return {
    name: node.value,
    children: node.children && node.children.length > 0
      ? node.children.map(c => convertToTreeD3(c))
      : undefined
  };
}

export default function ParseTree({ tree }) {
  if (!tree) return null;

  const data = convertToTreeD3(tree);

  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ccc', marginTop: '10px' }}>
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="elbow"
        translate={{ x: 300, y: 50 }}
        zoomable
      />
    </div>
  );
}
