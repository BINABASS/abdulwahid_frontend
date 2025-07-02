import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/auth/Welcome';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Properties from './components/properties/Properties';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
