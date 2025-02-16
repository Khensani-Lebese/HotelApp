import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/landingpage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
        console.log("User data:", userDocSnap.data());
        navigate("/rooms");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
  };

  return (
    <StyledWrapper>
      <LoginForm>
        <h1>Login</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <InputContainer>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>Email</span>
          </InputContainer>
          <InputContainer>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </InputContainer>
          <button type="submit" className="submit">
            Login
          </button>
        </form>

        {userData && (
          <UserInfo>
            <h3>Welcome, {userData.name}!</h3>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.cellphone}</p>
          </UserInfo>
        )}
      </LoginForm>
    </StyledWrapper>
  );
};

// Styled Components
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`;

const LoginForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 420px;
  width: 100%;
  text-align: center;
  color: #fff;
  animation: fadeIn 0.6s ease-in-out;

  h1 {
    font-size: 28px;
    font-weight: bold;
  }

  .submit {
    background: linear-gradient(135deg, #af40ff, #5b42f3 50%, #00ddeb);
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
    background: linear-gradient(135deg, #1e1e1e, 20%, #1e1e1e 50%, #1e1e1e);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 105, 135, 0.3);
  }
`;

const InputContainer = styled.label`
  position: relative;
  display: block;
  margin: 15px 0;

  input {
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

  input:focus {
    border-color: #ff7eb3;
  }

  input + span {
    position: absolute;
    left: 12px;
    top: 14px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
  }

  input:focus + span,
  input:valid + span {
    top: -10px;
    font-size: 12px;
    color: #ff7eb3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4b5c;
  font-size: 14px;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  margin-top: 15px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

export default Login;
