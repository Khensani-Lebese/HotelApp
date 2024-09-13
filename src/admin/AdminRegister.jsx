import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serialNumber, setSerialNumber] = useState(''); // Changed from identityNumber
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validSerialNumber = "ft8@ag@techwave.co!"; // The specific serial number

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Check if the entered serial number matches the valid one
    if (serialNumber !== validSerialNumber) {
      console.error("Invalid serial number");
      return;
    }

    try {
      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional admin info in Firestore
      await setDoc(doc(db, "admins", user.uid), {
        name: name,
        email: email,
        serialNumber: serialNumber, // Save the serial number
        uid: user.uid
      });

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error creating admin account:", error);
    }
  };

  return (
    <div>
      <h2>Admin Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        placeholder="Serial Number"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AdminRegister;
