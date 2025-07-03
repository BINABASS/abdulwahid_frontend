import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/auth/Welcome';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Properties from './components/properties/Properties';
import Layout from './components/layout/Layout';
import Booking from './components/bookings/Booking';
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
      <div className="app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/properties" element={
            <Layout>
              <Properties />
            </Layout>
          } />
          <Route path="/bookings" element={
            <Layout>
              <div className="no-bookings">
                <h2>No Property Selected</h2>
                <p>Please select a property from the properties list to proceed with booking.</p>
                <button onClick={() => window.location.href = '/properties'}>Go to Properties</button>
              </div>
            </Layout>
          } />
          <Route path="/booking/:propertyId" element={
            <Layout>
              <Booking />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
