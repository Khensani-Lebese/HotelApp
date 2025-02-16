import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Details = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { reservationData } = location.state || {};
  const navigate = useNavigate();
  console.log(reservationData);

  const handleConfirmBooking = () => {
    navigate("/payment", { state: { reservationData } });
  };

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
      <Container>
        <Title>Confirm Your Booking</Title>
        {reservationData ? (
          <Details>
            <p>
              <strong>Room Type:</strong> {reservationData.roomType}
            </p>
            <p>
              <strong>Check-in Date:</strong> {reservationData.checkInDate}
            </p>
            <p>
              <strong>Check-out Date:</strong> {reservationData.checkOutDate}
            </p>
            <p>
              <strong>Guests:</strong> {reservationData.guests}
            </p>
            <p>
              <strong>Special Requests:</strong>{" "}
              {reservationData.specialRequests}
            </p>
            <p>
              <strong>Total Price:</strong> R{reservationData.price}
            </p>
          </Details>
        ) : (
          <p>No reservation data found.</p>
        )}

        <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
      </Container>
    </>
  );
};

export default BookingConfirmationPage;
