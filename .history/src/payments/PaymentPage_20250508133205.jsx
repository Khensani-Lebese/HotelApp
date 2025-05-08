import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../firebaseConfig"; // Firebase config
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import logo from "../assets/logo.png";
import Logout from "../components/Logout";

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

const PaymentPage = () => {
  const location = useLocation();
  const { reservationData } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [currency] = useState("zar");
  const user = useSelector((state) => state.user || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (reservationData) {
      setAmount(reservationData.price * 100);
    }
  }, [reservationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not ready.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(
        "http://localhost:3001/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch payment intent.");

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        alert("Payment failed: " + error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");

        // Fetch available rooms
        const roomsRef = collection(db, "rooms");
        const q = query(
          roomsRef,
          where("type", "==", reservationData.roomType),
          where("status", "==", "available")
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("No available rooms in this category.");
          return;
        }

        // Assign the first available room
        const selectedRoom = querySnapshot.docs[0];
        const roomId = selectedRoom.id;

        // Mark room as unavailable
        await setDoc(
          doc(db, "rooms", roomId),
          { status: "unavailable" },
          { merge: true }
        );

        // Store booking in Firebase
        await addDoc(collection(db, "bookings"), {
          userId: user.id,
          email: user.email,
          roomId: roomId, // Include assigned room ID
          roomType: reservationData.roomType,
          checkInDate: reservationData.checkInDate,
          checkOutDate: reservationData.checkOutDate,
          guests: reservationData.guests,
          specialRequests: reservationData.specialRequests,
          totalPrice: reservationData.price,
          paymentStatus: "Paid",
          createdAt: new Date(),
        });

        navigate("/bookings");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing your payment.");
    }
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

      <div>
        <h2>Payment Page</h2>
        {reservationData ? (
          <div>
            <h3>Room Type: {reservationData.roomType}</h3>
            <p>Price: R{reservationData.price}</p>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit" disabled={!stripe}>
                Pay {currency.toUpperCase()} {amount / 100}
              </button>
            </form>
          </div>
        ) : (
          <p>Loading reservation details...</p>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
