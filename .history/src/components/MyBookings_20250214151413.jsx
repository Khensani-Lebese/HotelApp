import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Logout";
import logo from "../assets/logo.png";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const BookingList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookingItem = styled.li`
  background: #f9f9f9;
  border-left: 5px solid #007bff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const BookingDetails = styled.p`
  margin: 5px 0;
  color: #555;
`;

const Status = styled.span`
  font-weight: bold;
  color: ${(props) => (props.status === "Paid" ? "green" : "red")};
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
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

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.id)
        );
        const querySnapshot = await getDocs(q);
        setBookings(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      };
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      {/* Navbar */}
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>
        <NavLinks>
          <Link to="/room-categories">Room Categories</Link>
          <Link to="/profile">Profile</Link>
          <Logout />
        </NavLinks>
      </Navbar>

      {/* Bookings Container */}
      <Container>
        <Title>My Bookings</Title>
        {bookings.length > 0 ? (
          <BookingList>
            {bookings.map((booking) => (
              <BookingItem key={booking.id}>
                <h3>{booking.roomType}</h3>
                <BookingDetails>
                  {booking.checkInDate} to {booking.checkOutDate}
                </BookingDetails>
                <BookingDetails>Guests: {booking.guests}</BookingDetails>
                <BookingDetails>
                  Special Requests: {booking.specialRequests || "None"}
                </BookingDetails>
                <BookingDetails>
                  Total Price: <strong>R{booking.totalPrice}</strong>
                </BookingDetails>
                <BookingDetails>
                  Status:{" "}
                  <Status status={booking.paymentStatus}>
                    {booking.paymentStatus}
                  </Status>
                </BookingDetails>
              </BookingItem>
            ))}
          </BookingList>
        ) : (
          <p>No bookings found.</p>
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
