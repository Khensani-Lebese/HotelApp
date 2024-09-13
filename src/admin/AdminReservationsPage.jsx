import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, approveReservationInDb,cancelReservationInDb } from '../redux/reservationsSlice';


const AdminReservationsPage = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(state => state.reservations);
  const users = useSelector(state => state.users); 
  
  useEffect(() => {
    dispatch(fetchReservations()); 
  }, [dispatch]);

  const handleApprove = (reservationId) => {
    dispatch(approveReservationInDb(reservationId));
    alert('Reservation approved successfully');
  };

  const handleCancel = (reservationId) => {
    dispatch(cancelReservationInDb(reservationId));
    alert('Reservation canceled');
  };

  return (
    <div>
      <h2>Admin - Manage Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Room ID</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Guests</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => {
              const user = Array.isArray(users) ? users.find(user => user.id === reservation.userId) : null;
              
              return (
                <tr key={reservation.id}>
                   <td>{reservation.userId}</td> 
                  <td>{reservation.roomId}</td>
                  <td>{reservation.checkInDate}</td>
                  <td>{reservation.checkOutDate}</td>
                  <td>{reservation.guests}</td>
                  <td>${reservation.price}</td>
                  <td>{reservation.status}</td>
                  <td>
                    {reservation.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(reservation.id)}>Approve</button>
                        <button onClick={() => handleCancel(reservation.id)}>Cancel</button>
                      </>
                    )}
                    {reservation.status === 'approved' && <span>Approved</span>}
                    {reservation.status === 'canceled' && <span>Canceled</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReservationsPage;
