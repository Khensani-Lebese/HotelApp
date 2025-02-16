import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { reservationData } = location.state || {};
  const navigate = useNavigate();
  console.log(reservationData);

  const handleConfirmBooking = () => {
    navigate("/payment");
  };

  return (
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
            <strong>Special Requests:</strong> {reservationData.specialRequests}
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
  );
};

export default BookingConfirmationPage;
