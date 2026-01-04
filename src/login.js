// // LoginForm.js
// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleDecrypt = (text, key) => {
//     try {
//       const decrypted = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
//       return decrypted;
//     } catch (error) {
//       console.error('Decryption error:', error.message);
//       return null;
//     }
//   };

//   const handleLogin = () => {
//     const storedEncryptedUsername = localStorage.getItem('encryptedUsername');
//     const storedEncryptedPassword = localStorage.getItem('encryptedPassword');
//     const decryptedUsername = handleDecrypt(storedEncryptedUsername, 'SecretKey123');
//     const decryptedPassword = handleDecrypt(storedEncryptedPassword, 'SecretKey123');
//     const storedUsername = localStorage.getItem('username');

//     if (decryptedPassword === password && decryptedUsername === username) {
//       // Navigate to the welcome page after successful login
//       navigate('/welcome');
//       alert('Login successful!');
//     } else {
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div>
//       <h1>Login Form</h1>
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
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginForm;
