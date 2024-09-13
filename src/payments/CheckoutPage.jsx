import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; // Import the checkout form

const stripePromise = loadStripe('pk_test_51PyWTm0703bt2YKuy7fe77MczrBSkgVvCEIUvxfeRzKRbSiJ7r3JMwvgIYp44pEgK1NhYsNBhpkZRyJXo2UHLKAq00LHg89OzU');

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={5000} currency="usd" /> {/* Amount in cents (5000 => $50) */}
    </Elements>
  );
};

export default CheckoutPage;
