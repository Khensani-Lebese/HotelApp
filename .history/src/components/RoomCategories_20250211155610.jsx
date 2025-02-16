import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import landingpage from "../assets/landingpage.png"; // Import the background image
import Slider from "react-slick"; // Import react-slick
import {
  FaBed,
  FaWifi,
  FaRegSnowflake,
  FaBath,
  FaAirbnb,
  FaCity,
  FaConciergeBell,
  FaCoins,
} from "react-icons/fa"; // Import icons

// Styled components
const Container = styled.div`
  padding: 0;
  max-width: 1600px;
  margin: 0;
  background-image: url(${landingpage}); /* Set the background image */
  background-size: cover; /* Cover the entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent repeating the image */
  height: 100vh; /* Make the background cover the full height of the screen */
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
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Add a slight overlay for better text contrast */
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

// Container for all category sections
const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* Allow wrapping of cards on smaller screens */
  gap: 2rem; /* Space between cards */
`;

// Room Category Section Styles
const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(150, 144, 144, 0.9); /* Light background for readability */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  height: 560px;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CategoryDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const CategoryImage = styled.img`
  width: 100%;
  max-width: 200px; /* Make image smaller */
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const BookNowButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

// Carousel Styles
const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 300px; /* Adjust carousel width to match smaller cards */
  margin-bottom: 1.5rem;
`;

const CategoryFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  color: #333;
`;

const FeatureItem = styled.li`
  font-size: 0.9rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center; /* Align the icons and text */
  gap: 0.5rem; /* Space between icon and text */
`;

// React Slick settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RoomCategories = () => {
  return (
    <Container>
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>
      </Navbar>

      <CategoryContainer>
        <CategorySection>
          <CategoryTitle>Standard Room</CategoryTitle>
          <CarouselWrapper>
            <Slider {...carouselSettings}>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Standard Room 1"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/3760126/pexels-photo-3760126.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Standard Room 2"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/1592135/pexels-photo-1592135.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Standard Room 3"
                />
              </div>
            </Slider>
          </CarouselWrapper>
          <CategoryDescription>
            Our Standard Rooms offer comfortable accommodations with modern
            amenities. Perfect for travelers looking for a budget-friendly
            option without compromising on quality.
          </CategoryDescription>
          <CategoryFeatures>
            <FeatureItem>
              <FaBed /> Comfortable Queen-size bed
            </FeatureItem>
            <FeatureItem>
              <FaWifi /> Free Wi-Fi
            </FeatureItem>
            <FeatureItem>
              <FaRegSnowflake /> Air conditioning
            </FeatureItem>
          </CategoryFeatures>
          <BookNowButton to="/register">Book Now</BookNowButton>
        </CategorySection>

        <CategorySection>
          <CategoryTitle>Deluxe Room</CategoryTitle>
          <CarouselWrapper>
            <Slider {...carouselSettings}>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/635041/pexels-photo-635041.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Deluxe Room 1"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/2058411/pexels-photo-2058411.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Deluxe Room 2"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/3740749/pexels-photo-3740749.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Deluxe Room 3"
                />
              </div>
            </Slider>
          </CarouselWrapper>
          <CategoryDescription>
            The Deluxe Rooms provide a more luxurious experience with additional
            space and upscale furnishings. Ideal for those who want a bit more
            comfort and elegance during their stay.
          </CategoryDescription>
          <CategoryFeatures>
            <FeatureItem>
              <FaBed /> King-size bed
            </FeatureItem>
            <FeatureItem>
              <FaAirbnb /> Private balcony with ocean view
            </FeatureItem>
            <FeatureItem>
              <FaBath /> Premium toiletries
            </FeatureItem>
          </CategoryFeatures>
          <BookNowButton to="/register">Book Now</BookNowButton>
        </CategorySection>

        <CategorySection>
          <CategoryTitle>Superior Room</CategoryTitle>
          <CarouselWrapper>
            <Slider {...carouselSettings}>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/3775459/pexels-photo-3775459.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Superior Room 1"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/2907438/pexels-photo-2907438.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Superior Room 2"
                />
              </div>
              <div>
                <CategoryImage
                  src="https://images.pexels.com/photos/3560878/pexels-photo-3560878.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Superior Room 3"
                />
              </div>
            </Slider>
          </CarouselWrapper>
          <CategoryDescription>
            Our Superior Rooms offer top-of-the-line amenities and breathtaking
            views. Perfect for guests who seek the ultimate in luxury and style.
          </CategoryDescription>
          <CategoryFeatures>
            <FeatureItem>
              <FaCity /> Panoramic city views
            </FeatureItem>
            <FeatureItem>
              <FaCoins />
              Casino
            </FeatureItem>

            <FeatureItem>
              <FaConciergeBell /> Personalized concierge service
            </FeatureItem>
          </CategoryFeatures>
          <BookNowButton to="/register">Book Now</BookNowButton>
        </CategorySection>
      </CategoryContainer>
    </Container>
  );
};

export default RoomCategories;
