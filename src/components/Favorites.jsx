import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const rooms = useSelector((state) => state.rooms);

  const favoriteRooms = rooms.filter((room) => favorites.includes(room.id));

  return (
    <>
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>

        <NavLinks>
          <Link to="/profile">Profile</Link>
          <Link to="/bookings">My bookings</Link>
          <Link to="/favorites">Favorites</Link>
          <Logout />
        </NavLinks>
      </Navbar>
      <StyledFavorites>
        <Title>Your Favorite Rooms</Title>
        {favoriteRooms.length > 0 ? (
          <RoomContainer>
            {favoriteRooms.map((room) => (
              <RoomCard key={room.id}>
                <h4>{room.type}</h4>
                <p>
                  <strong>Price:</strong> R{room.price}
                </p>
                <p>
                  <strong>Capacity:</strong> {room.capacity} Guests
                </p>

                {room.images && room.images.length > 0 && (
                  <RoomImages>
                    {room.images.map((imageUrl, index) => (
                      <RoomImage
                        key={index}
                        src={imageUrl}
                        alt={`Room ${index}`}
                      />
                    ))}
                  </RoomImages>
                )}
              </RoomCard>
            ))}
          </RoomContainer>
        ) : (
          <NoFavorites>No favorite rooms added yet!</NoFavorites>
        )}
      </StyledFavorites>
    </>
  );
};

// Styled Components
const StyledFavorites = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const RoomCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h4 {
    color: #007bff;
    font-size: 1.2rem;
  }

  p {
    color: #444;
    font-size: 1rem;
  }
`;

const RoomImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const RoomImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const NoFavorites = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
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

export default Favorites;
