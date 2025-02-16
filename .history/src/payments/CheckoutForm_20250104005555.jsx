import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fetch the payment intent from the backend
    const res = await fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }), // amount in cents
    });

    const { clientSecret } = await res.json();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      setLoading(false);
      alert('Payment successful!');
      // You can update your booking here
    }
  };

  return (
    <div>
      <h3>Complete Payment</h3>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button disabled={!stripe || loading} type="submit">
          {loading ? 'Processing...' : `Pay ${currency.toUpperCase()} ${amount / 100}`}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {paymentSuccess && <div>Payment succeeded!</div>}
    </div>
  );
};

export default CheckoutForm;
