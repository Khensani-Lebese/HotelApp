// src/components/LandingPage.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import landingpage from "../assets/landingpage.png";
import { FaShareAlt } from "react-icons/fa";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
  color: #fff;
`;
// Share Button Styles
const ShareButton = styled.button`
  display: flex;
  align-items: center;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }

  svg {
    margin-right: 8px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

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

const Footer = styled.footer`
  background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
`;

const LogoImage = styled.img`
  height: 50px; /* Adjust as needed */
  margin-right: 1rem;
`;
const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: url(${landingpage}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Overlay effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay for transparency */
  }
`;

// Map & Share Button container
const BottomRightContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const MapEmbed = styled.iframe`
  width: 70%;
  height: 50%;
  border: none;
  border-radius: 8px;
`;

const LandingPage = () => {
  const handleShare = async () => {
    const shareData = {
      title: "TechWave Hotel",
      text: "Check out the amazing features of TechWave Hotel!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support sharing.");
    }
  };

  return (
    <Container>
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>
        <NavLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/policies">Policies</Link>
          <Link to="/room-categories">Room Categories</Link>
        </NavLinks>
      </Navbar>

      <BackgroundWrapper>
        <BottomRightContainer>
          <MapEmbed
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBnX5oKBld3yRk15iVykNcWWIcWr7gSq1Y&q=TechWave+Hotel"
            allowFullScreen
          />

          <ShareButton onClick={handleShare}>
            <FaShareAlt />
            Share Hotel
          </ShareButton>
        </BottomRightContainer>
      </BackgroundWrapper>

      <Footer>
        <p>
          &copy; 2024 TechWaveHotelApp. All rights reserved.{" "}
          <Link to="/policies">Policies</Link>
        </p>
      </Footer>
    </Container>
  );
};

export default LandingPage;
