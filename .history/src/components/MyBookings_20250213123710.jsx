import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.id)
        );
        const querySnapshot = await getDocs(q);
        setBookings(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      };
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.roomType}</strong> - {booking.checkInDate} to{" "}
              {booking.checkOutDate}
              <p>Guests: {booking.guests}</p>
              <p>Special Requests: {booking.specialRequests}</p>
              <p>Total Price: R{booking.totalPrice}</p>
              <p>Status: {booking.paymentStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
