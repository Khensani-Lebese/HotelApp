import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const location = useLocation();
  const { reservationData } = location.state || {}; // Get reservation data from location.state
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [currency] = useState("zar"); // You can change this to other currencies if needed

  useEffect(() => {
    if (reservationData) {
      setAmount(reservationData.price * 100); // Convert price to cents for Stripe
    }
  }, [reservationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable the form until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Call your backend to create a payment intent (this assumes your backend is set up correctly)
    const response = await fetch(
      "http://localhost:3001/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency }), // amount in cents
      }
    );

    const { clientSecret } = await response.json();

    // Confirm the payment using the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      // You can now update your booking status or perform other actions
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
