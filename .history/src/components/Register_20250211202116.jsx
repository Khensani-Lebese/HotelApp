import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import landingPage from "../assets/landingpage.png";

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
      <FormContainer>
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message">Sign up now and get full access to our app.</p>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputLabel>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span>Full Name</span>
          </InputLabel>
          <InputLabel>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>Email</span>
          </InputLabel>
          <InputLabel>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </InputLabel>
          <InputLabel>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span>Confirm Password</span>
          </InputLabel>
          <InputLabel>
            <input
              type="tel"
              className="input"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              required
            />
            <span>Cellphone Number</span>
          </InputLabel>
          <button type="submit" className="submit">
            Register
          </button>
          <p className="signin">
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </form>
      </FormContainer>
    </StyledWrapper>
  );
};
// Styled Components
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${landingPage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormContainer = styled.div`
  background: rgba(253, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 420px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;

  .title {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
  }

  .message {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    margin-bottom: 15px;
  }

  .submit {
    background: linear-gradient(135deg, #007bff, rgb(117, 168, 255));
    padding: 12px;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 15px;
  }

  .submit:hover {
    background: linear-gradient(135deg, rgb(101, 114, 255), #007bff);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 105, 135, 0.3);
  }

  .signin {
    margin-top: 15px;
    font-size: 14px;
    color: #fff;
  }

  .signin a {
    color: #007bff;
    text-decoration: none;
  }

  .signin a:hover {
    text-decoration: underline;
  }
`;

const InputLabel = styled.label`
  position: relative;
  display: block;
  margin: 15px 0;

  .input {
    width: 100%;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: transparent;
    color: #fff;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .input:focus {
    border-color: #007bff;
  }

  .input + span {
    position: absolute;
    left: 12px;
    top: 14px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
  }

  .input:focus + span,
  .input:valid + span {
    top: -10px;
    font-size: 12px;
    color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4b5c;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default Register;
