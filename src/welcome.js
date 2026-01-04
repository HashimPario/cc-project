// // Welcome.js
// import React, { useEffect, useState } from 'react';
// import CryptoJS from 'crypto-js';
// import './WelcomeStyles.css'; // Import the CSS file for styling

// const Welcome = () => {
//   const [decryptedUsername, setDecryptedUsername] = useState('');
//   const [encryptedUsername, setEncryptedUsername] = useState('');

//   useEffect(() => {
//     const storedEncryptedUsername = localStorage.getItem('encryptedUsername');

//     try {
//       const decrypted = CryptoJS.DES.decrypt(storedEncryptedUsername, 'SecretKey123').toString(CryptoJS.enc.Utf8);
//       setDecryptedUsername(decrypted);
//       setEncryptedUsername(storedEncryptedUsername);
//     } catch (error) {
//       console.error('Decryption error:', error.message);
//     }
//   }, []);

//   return (
//     <div className="welcome-container">
//       <h1>Welcome to the App</h1>
//       {decryptedUsername && (
//         <div>
//           <p>Decrypted Username: {decryptedUsername}</p>
//           <p>Encrypted Username: {encryptedUsername}</p>
//         </div>
//       )}
//       {!decryptedUsername && <p>Username not available.</p>}
//     </div>
//   );
// };

// export default Welcome;
