// // SignupForm.js
// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';
// import './FormStyles.css'; // Import the CSS file for styling

// const SignupForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEncrypt = (text, key) => {
//     try {
//       return CryptoJS.DES.encrypt(text, key).toString();
//     } catch (error) {
//       console.error('Encryption error:', error.message);
//       return null;
//     }
//   };

//   const handleSignup = () => {
//     const encryptedUsername = handleEncrypt(username, 'SecretKey123');
//     const encryptedPassword = handleEncrypt(password, 'SecretKey123');

//     localStorage.setItem('encryptedUsername', encryptedUsername);
//     localStorage.setItem('encryptedPassword', encryptedPassword);
   
//     alert('Signup successful! Please proceed to login.');
//   };

//   return (
//     <div className="form-container">
//       <h1>Signup Form</h1>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// export default SignupForm;
