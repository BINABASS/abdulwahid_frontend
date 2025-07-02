import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Digital Brokerage</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <a href="/dashboard">
                <span>📊</span>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/properties">
                <span>🏠</span>
                Properties
              </a>
            </li>
            <li>
              <a href="/bookings">
                <span>📅</span>
                Bookings
              </a>
            </li>
            <li>
              <a href="/clients">
                <span>👥</span>
                Clients
              </a>
            </li>
            <li>
              <a href="/messages">
                <span>💬</span>
                Messages
              </a>
            </li>
            <li>
              <a href="/reports">
                <span>📊</span>
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="user-info">
            <span>Admin</span>
            <button className="logout-btn">Logout</button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Properties</h3>
            <div className="stat-value">125</div>
            <div className="stat-change positive">+15%</div>
          </div>
          <div className="stat-card">
            <h3>Active Bookings</h3>
            <div className="stat-value">42</div>
            <div className="stat-change positive">+8%</div>
          </div>
          <div className="stat-card">
            <h3>New Clients</h3>
            <div className="stat-value">35</div>
            <div className="stat-change positive">+12%</div>
          </div>
          <div className="stat-card">
            <h3>Messages</h3>
            <div className="stat-value">18</div>
            <div className="stat-change negative">-5%</div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="chart-container">
            <h3>Recent Activity</h3>
            <div className="chart-placeholder">
              {/* Chart will be added here */}
            </div>
          </div>
          <div className="chart-container">
            <h3>Property Distribution</h3>
            <div className="chart-placeholder">
              {/* Chart will be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
