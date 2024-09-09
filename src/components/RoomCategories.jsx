// src/components/RoomCategories.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

// Styled components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const LogoImage = styled.img`
  height: 50px; /* Adjust as needed */
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

const CategorySection = styled.section`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const CategoryImage = styled.img`
  width: 50%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const RoomCategories = () => {
  return (
    <Container>
      <Navbar>
      <Logo><LogoImage src={logo} alt="Hotel Logo" />TechWave Hotel</Logo>
        <BackButton to="/">Back to Landing Page</BackButton>
      </Navbar>
      <CategorySection>
        <CategoryTitle>Standard Room</CategoryTitle>
        <CategoryImage src="" alt="Standard Room" />
        <CategoryDescription>
          Our Standard Rooms offer comfortable accommodations with modern amenities. Perfect for travelers looking for a budget-friendly option without compromising on quality.
        </CategoryDescription>
      </CategorySection>
      <CategorySection>
        <CategoryTitle>Deluxe Room</CategoryTitle>
        <CategoryImage src="path/to/deluxe-room.jpg" alt="Deluxe Room" />
        <CategoryDescription>
          The Deluxe Rooms provide a more luxurious experience with additional space and upscale furnishings. Ideal for those who want a bit more comfort and elegance during their stay.
        </CategoryDescription>
      </CategorySection>
      <CategorySection>
        <CategoryTitle>Superior Room</CategoryTitle>
        <CategoryImage src="path/to/superior-room.jpg" alt="Superior Room" />
        <CategoryDescription>
          Our Superior Rooms offer top-of-the-line amenities and breathtaking views. Perfect for guests who seek the ultimate in luxury and style.
        </CategoryDescription>
      </CategorySection>
    </Container>
  );
};

export default RoomCategories;
