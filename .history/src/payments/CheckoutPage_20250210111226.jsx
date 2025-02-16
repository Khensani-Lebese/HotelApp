import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PyWTm0703bt2YKuy7fe77MczrBSkgVvCEIUvxfeRzKRbSiJ7r3JMwvgIYp44pEgK1NhYsNBhpkZRyJXo2UHLKAq00LHg89OzU"
);

const CheckoutPage = () => {
  const { roomId } = useParams(); // Retrieve the roomId from the URL
  const rooms = useSelector((state) => state.rooms);
  const reservations = useSelector((state) => state.reservations);

  // Find the reservation for this room
  const reservation = reservations.find((res) => res.roomId === roomId);
  const room = rooms.find((room) => room.id === roomId);

  const totalNights =
    reservation &&
    Math.ceil(
      (new Date(reservation.checkOutDate) - new Date(reservation.checkInDate)) /
        (1000 * 60 * 60 * 24)
    );

  const totalAmount = reservation ? totalNights * room?.price : 0; // Calculate total price

  return (
    <div>
      <h2>Checkout</h2>
      <p>
        You have booked the room <strong>{room.type}</strong> for{" "}
        <strong>{totalNights} nights</strong>.
      </p>
      <p>
        Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
      </p>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={totalAmount * 100} currency="zar" />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
