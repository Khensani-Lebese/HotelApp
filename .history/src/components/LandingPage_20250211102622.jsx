// src/components/LandingPage.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path as needed
import Carousel from "react-bootstrap/Carousel"; // Using react-bootstrap carousel
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for carousel styles

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

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px; /* Adjust height as needed */
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover; /* Ensures the image covers the entire area without distortion */
`;

const CatchyPhrase = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const LandingPage = () => {
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

      {/* Carousel Section */}
      <CarouselWrapper>
        <CatchyPhrase>
          "Experience Luxury & Comfort Like Never Before"
        </CatchyPhrase>
        <Carousel fade>
          <Carousel.Item>
            <CarouselImage
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Elegant Rooms"
            />
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage
              src="https://images.pexels.com/photos/12918201/pexels-photo-12918201.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Exquisite Dining"
            />
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage
              src="https://images.pexels.com/photos/3757657/pexels-photo-3757657.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Relaxing Spa"
            />
          </Carousel.Item>
        </Carousel>
      </CarouselWrapper>

      <Footer>
        <p>&copy; 2024 TechWaveHotelApp. All rights reserved.</p>
        <Link to="/policies">Policies</Link>
      </Footer>
    </Container>
  );
};

export default LandingPage;
