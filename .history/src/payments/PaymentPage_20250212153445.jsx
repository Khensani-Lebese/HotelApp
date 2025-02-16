import React, { useState, useEffect } from "react";

const PaymentPage = ({ reservationData }) => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("zar");

  useEffect(() => {
    if (reservationData) {
      setAmount(reservationData.price * 100); // Convert to cents
    }
  }, [reservationData]);

  return (
    <div>
      <h2>Payment Page</h2>
      {reservationData ? (
        <div>
          <h3>Room Type: {reservationData.roomType}</h3>
          <p>Price: R{reservationData.price}</p>
        </div>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
