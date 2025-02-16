import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const userBookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(userBookings);
    };

    fetchBookings();
  }, [userId]);

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h3>{booking.roomType}</h3>
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

export default UserBookings;
