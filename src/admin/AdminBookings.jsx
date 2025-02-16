import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      setBookings(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>User:</strong> {booking.email} <br />
              <strong>Room:</strong> {booking.roomType} <br />
              <strong>Check-in:</strong> {booking.checkInDate} <br />
              <strong>Check-out:</strong> {booking.checkOutDate} <br />
              <strong>Status:</strong> {booking.paymentStatus}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default AdminBookings;
