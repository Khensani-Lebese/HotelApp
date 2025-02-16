import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../redux/reservationsSlice";
import { useParams, useNavigate } from "react-router-dom";

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

const Price = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
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

const BookingsPage = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const rooms = useSelector((state) => state.rooms);
  const room = rooms.find((room) => room.id === roomId);
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationData = {
      userId: currentUser?.id,
      roomId: roomId,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      price: room?.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Dispatch action to create reservation
    dispatch(createReservation(reservationData));

    // Redirect to confirmation page
    navigate(`/bookings/confirmation`, { state: { reservationData } });
  };

  return (
    <Container>
      <Title>Book Room {room?.type}</Title>
      {room ? (
        <Price>Price: R{room?.price} per night</Price>
      ) : (
        <Price>Loading room details...</Price>
      )}

      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Check-in Date:</Label>
          <Input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Check-out Date:</Label>
          <Input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Number of Guests:</Label>
          <Input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <Label>Special Requests:</Label>
          <TextArea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any additional requests..."
          />
        </div>

        <Button type="submit">Book Now</Button>
      </Form>
    </Container>
  );
};

export default BookingsPage;
