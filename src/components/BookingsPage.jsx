import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../redux/reservationsSlice';
import { useParams,useNavigate } from 'react-router-dom';

const BookingsPage = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user); 
  const rooms = useSelector(state => state.rooms);
  const room = rooms.find(room => room.id === roomId);
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    console.log('Current User:', currentUser);
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      userId: currentUser?.id,
      roomId: roomId,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      price: room?.price, // Get room price from the room details
      status: 'pending', // Default status for a new reservation
      createdAt: new Date().toISOString(),
    };

    // Dispatch action to create reservation
    dispatch(createReservation(reservationData));

    // Clear form or show confirmation
    alert('Reservation made successfully!');
  };

  return (
    <div>
      <h2>Book Room {room?.type}</h2>
      <p>Price: ${room?.price} per night</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <label>Special Requests:</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any additional requests..."
          />
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingsPage;
