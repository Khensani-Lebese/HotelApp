import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const allBookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(allBookings);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h3>User ID: {booking.userId}</h3>
            <p>Room Type: {booking.roomType}</p>
            <p>Check-in: {booking.checkInDate}</p>
            <p>Check-out: {booking.checkOutDate}</p>
            <p>Total Price: R{booking.totalPrice}</p>
            <p>Status: {booking.paymentStatus}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AdminBookings;
