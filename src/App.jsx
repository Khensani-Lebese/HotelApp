// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startListeningToRooms } from './redux/roomsSlice';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import RoomList from './components/RoomList';
import AdminRegister from './admin/AdminRegister';
import BookingsPage from './components/BookingsPage';
import RoomCategories from './components/RoomCategories';
import Policies from './components/Policies';
import AdminReservationsPage from './admin/AdminReservationsPage';
import { listenToAuthChanges } from './redux/userSlice'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './payments/CheckoutPage';

const stripePromise = loadStripe('pk_test_51PyWTm0703bt2YKuy7fe77MczrBSkgVvCEIUvxfeRzKRbSiJ7r3JMwvgIYp44pEgK1NhYsNBhpkZRyJXo2UHLKAq00LHg89OzU');

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startListeningToRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/bookings/:roomId" element={<BookingsPage />} />
        <Route path="/room-categories" element={<RoomCategories />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> 

      
      </Routes>
    </Router>
  );
};

export default App;
