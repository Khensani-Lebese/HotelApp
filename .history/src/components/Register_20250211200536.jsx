import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        cellphone: cellphone,
        uid: user.uid,
      });

      alert("Registration Successful!");
    } catch (error) {
      setError(error.message);
    }

    navigate("/login");
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>Full Name</span>
        </label>
        <label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </label>
        <label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </label>
        <label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm Password</span>
        </label>
        <label>
          <input
            type="tel"
            className="input"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            required
          />
          <span>Cellphone Number</span>
        </label>
        <button type="submit" className="submit">
          Register
        </button>
        <p className="signin">
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </form>
    </StyledWrapper>
  );
};

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

// Styled Components
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default Register;
