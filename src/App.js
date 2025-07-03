import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './components/auth/Welcome';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Properties from './components/properties/Properties';
import Layout from './components/layout/Layout';
import Booking from './components/bookings/Booking';
import Contact from './components/Contact';
import './App.css';

// Configure React Router v7 future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router future={routerConfig.future}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="booking/:id" element={<Booking />} />
        </Route>
        <Route path="/bookings" element={
          <Layout>
            <div className="no-bookings">
              <h2>No Bookings</h2>
              <p>You need to select a property first.</p>
              <Link to="/properties" className="back-btn">
                <i className="fas fa-arrow-left"></i> Back to Properties
              </Link>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
