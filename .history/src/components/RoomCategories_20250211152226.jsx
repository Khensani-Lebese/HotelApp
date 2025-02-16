// src/components/RoomCategories.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// Styled components
const Container = styled.div`
  padding: 0;
  max-width: 1900px;
  margin: 0;
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 1rem;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
  color: #fff;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BackButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  background: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

// Room Category Section Styles
const CategorySection = styled.section`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const CategoryImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const BookNowButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const RoomCategories = () => {
  return (
    <Container>
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>
        <BackButton to="/">Back to Landing Page</BackButton>
      </Navbar>

      <CategorySection>
        <CategoryTitle>Standard Room</CategoryTitle>
        <CategoryImage
          src="https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Standard Room"
        />
        <CategoryDescription>
          Our Standard Rooms offer comfortable accommodations with modern
          amenities. Perfect for travelers looking for a budget-friendly option
          without compromising on quality.
        </CategoryDescription>
        <BookNowButton to="/book/standard">Book Now</BookNowButton>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>Deluxe Room</CategoryTitle>
        <CategoryImage
          src="https://images.pexels.com/photos/635041/pexels-photo-635041.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Deluxe Room"
        />
        <CategoryDescription>
          The Deluxe Rooms provide a more luxurious experience with additional
          space and upscale furnishings. Ideal for those who want a bit more
          comfort and elegance during their stay.
        </CategoryDescription>
        <BookNowButton to="/book/deluxe">Book Now</BookNowButton>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>Superior Room</CategoryTitle>
        <CategoryDescription>
          Our Superior Rooms offer top-of-the-line amenities and breathtaking
          views. Perfect for guests who seek the ultimate in luxury and style.
        </CategoryDescription>
        <BookNowButton to="/book/superior">Book Now</BookNowButton>
      </CategorySection>
    </Container>
  );
};

export default RoomCategories;
