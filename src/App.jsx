// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login'; // Import your Login component
import Policies from './components/Policies'; 
import Gallery from './components/RoomCategories'; // Import your Policies component
import RoomCategories from './components/RoomCategories';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/room-categories" element={<RoomCategories />} /> 
        {/* Create this component */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
