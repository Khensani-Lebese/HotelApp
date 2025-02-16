import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../redux/reservationsSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import Logout from "./Logout";
import logo from "../assets/logo.png";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("/assets/landingpage.png") center/cover no-repeat;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  }
`;

const BookingCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;

const Price = styled.p`
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 14px;
  background-color: #007bff;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

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

    if (!room?.price) {
      alert("Price not available for this room.");
      return;
    }

    const reservationData = {
      userId: currentUser?.id,
      roomId: roomId,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      price: room?.price,
      roomType: room?.type,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    dispatch(createReservation(reservationData));
    navigate(`/bookings/confirmation`, { state: { reservationData } });
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
      <PageContainer>
        <BookingCard>
          <Title>Book {room?.type} Room</Title>
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
        </BookingCard>
      </PageContainer>
    </>
  );
};

export default BookingsPage;
