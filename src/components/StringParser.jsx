// import React, { useState } from "react";

// export default function StringParser({ grammar, table, start }) {
//   const [inputString, setInputString] = useState("");
//   const [result, setResult] = useState(null);

//   const handleParse = () => {
//     try {
//       const { parseString } = require("../utils/ll1Parser");
//       const res = parseString(grammar, table, inputString, start);
//       setResult(res);
//     } catch (err) {
//       console.error(err);
//       alert("Error parsing string!");
//     }
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h3>Parse Input String</h3>
//       <input
//         type="text"
//         placeholder="Enter string with spaces, e.g., ( ( ) )"
//         value={inputString}
//         onChange={e => setInputString(e.target.value)}
//         style={{ width: "300px", marginRight: "10px" }}
//       />
//       <button onClick={handleParse}>Parse String</button>

//       {result && (
//         <div style={{ marginTop: "10px" }}>
//           <b>Result: </b>{result.accepted ? "Accepted ✅" : "Rejected ❌"}
//           {result.tree && (
//             <div style={{ marginTop: "10px" }}>
//               <b>Parse Tree:</b>
//               <pre>{JSON.stringify(result.tree, null, 2)}</pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState } from "react";
import ParseTree from "./ParseTree";
import { parseString } from "../utils/ll1Parser";

export default function StringParser({ grammar, table, start }) {
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(null);

  const handleParse = () => {
    const res = parseString(grammar, table, inputString, start);
    setResult(res);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Parse Input String</h3>
      <input
        type="text"
        placeholder="Enter string e.g., ( ( ) )"
        value={inputString}
        onChange={e => setInputString(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleParse}>Parse String</button>

      {result && (
        <div style={{ marginTop: "10px" }}>
          <b>Result: </b>{result.accepted ? "Accepted ✅" : "Rejected ❌"}
          {result.tree && <ParseTree tree={result.tree} />}
        </div>
      )}
    </div>
  );
}
