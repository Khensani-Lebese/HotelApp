import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice"; // Adjust based on your Redux structure
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser()); // Clear user data from Redux
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return <LogoutButton onClick={handleLogout}>Logout</LogoutButton>;
};

// Styled Button
const LogoutButton = styled.button`
  background: #ff4040;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #cc0000;
  }
`;

export default Logout;
