import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validSerialNumber = "ft8@ag@techwave.co!";

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    if (serialNumber !== validSerialNumber) {
      console.error("Invalid serial number");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "admins", user.uid), {
        name: name,
        email: email,
        serialNumber: serialNumber,
        uid: user.uid,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating admin account:", error);
    }
  };

  return (
    <StyledWrapper>
      <form className="form">
        <p className="title">Admin Register</p>
        <p className="message">
          Sign up now and get full access to the admin dashboard.
        </p>

        <label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>Name</span>
        </label>

        <label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
          <span>Serial Number</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm Password</span>
        </label>

        <button className="submit" type="button" onClick={handleRegister}>
          Register
        </button>
        <p className="signin">
          Already have an account? <NavLink to="/admin/login">Sign in</NavLink>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 1550px;
    height: 700px;
    padding: 20px;
    border-radius: 20px;
    margin: 0 auto;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .message {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 40%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: #00bfff;
    width: 40%;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }
`;

export default AdminRegister;
