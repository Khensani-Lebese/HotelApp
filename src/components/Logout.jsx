import React from "react";
import { useNavigate, Link } from "react-router-dom";
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

  return <Link onClick={handleLogout}>Logout</Link>;
};

const NavLinks = styled.div`
  a {
    color: #fff;
    text-decoration: none;
    margin-left: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Logout;
