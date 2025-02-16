import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../firebaseConfig"; // Import Firebase config
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const location = useLocation();
  const { reservationData } = location.state || {}; // Get reservation data from location.state
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [currency] = useState("zar"); // You can change this to other currencies if needed
  const user = useSelector((state) => state.auth.user || null);

  useEffect(() => {
    if (reservationData) {
      setAmount(reservationData.price * 100); // Convert price to cents for Stripe
    }
  }, [reservationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not ready.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

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
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");

      // Store booking in Firebase
      await addDoc(collection(db, "bookings", `${user.uid}_${Date.now()}`), {
        userId: user.uid,
        roomType: reservationData.roomType,
        checkInDate: reservationData.checkInDate,
        checkOutDate: reservationData.checkOutDate,
        guests: reservationData.guests,
        specialRequests: reservationData.specialRequests,
        totalPrice: reservationData.price,
        paymentStatus: "Paid",

        createdAt: new Date(),
      });

      navigate("/bookings"); // Redirect to bookings page
    }
  };

  return (
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
  );
};

export default PaymentPage;
