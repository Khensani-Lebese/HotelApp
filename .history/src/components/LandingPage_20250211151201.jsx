// src/components/LandingPage.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import landingpage from "../assets/landingpage.png";
import {
  FaShareAlt,
  FaWifi,
  FaSwimmer,
  FaDumbbell,
  FaConciergeBell,
  FaSpa,
  FaParking,
} from "react-icons/fa";

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

// Amenities section
const AmenitiesSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  z-index: 2;
`;

const AmenityCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  margin: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  text-align: center;

  svg {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #007bff;
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
// Animation for the title text
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

// Title Text for Amenities
const TitleText = styled.h2`
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: bold;
  color: white;
  animation: ${bounce} 1s ease-in-out infinite;
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
          <Link to="/room-categories">Room Categories</Link>
        </NavLinks>
      </Navbar>

      <BackgroundWrapper>
        <TitleText>Experience Unmatched Luxury and Comfort</TitleText>
        <AmenitiesSection>
          <AmenityCard>
            <FaWifi />
            <p>Free WiFi</p>
          </AmenityCard>
          <AmenityCard>
            <FaSwimmer />
            <p>Swimming Pool</p>
          </AmenityCard>
          <AmenityCard>
            <FaDumbbell />
            <p>Fitness Center</p>
          </AmenityCard>
          <AmenityCard>
            <FaConciergeBell />
            <p>24/7 Service</p>
          </AmenityCard>
          <AmenityCard>
            <FaSpa />
            <p>Spa & Wellness</p>
          </AmenityCard>
          <AmenityCard>
            <FaParking />
            <p>Free Parking</p>
          </AmenityCard>
        </AmenitiesSection>

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
