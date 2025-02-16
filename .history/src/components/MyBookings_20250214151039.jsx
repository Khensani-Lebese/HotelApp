import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import logo from "../assets/logo.png";
import styled from "styled-components";

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
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.roomType}</strong> - {booking.checkInDate} to{" "}
              {booking.checkOutDate}
              <p>Guests: {booking.guests}</p>
              <p>Special Requests: {booking.specialRequests}</p>
              <p>Total Price: R{booking.totalPrice}</p>
              <p>Status: {booking.paymentStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
