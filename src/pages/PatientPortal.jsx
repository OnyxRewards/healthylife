import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import DashboardCard from '../components/portal/DashboardCard';
import AppointmentList from '../components/portal/AppointmentList';
import Button from '../components/common/Button';
import './PatientPortal.css';

function PatientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual auth check
  const [userData, setUserData] = useState({
    name: 'John Doe',
    appointments: [
      {
        id: 1,
        service: 'General Check-up',
        doctor: 'Sarah Johnson',
        date: '2024-04-15',
        time: '10:00 AM',
        status: 'confirmed'
      },
      // Add more appointments...
    ]
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCancelAppointment = (appointmentId) => {
    // Add appointment cancellation logic
    console.log('Cancelling appointment:', appointmentId);
  };

  return (
    <div className="patient-portal">
      <div className="container">
        <header className="portal-header">
          <div>
            <h1>Welcome back, {userData.name}</h1>
            <p>Manage your healthcare journey</p>
          </div>
          <Button variant="primary" as={Link} to="/appointment">
            Book New Appointment
          </Button>
        </header>

        <div className="dashboard-grid">
          <DashboardCard
            title="Upcoming Appointments"
            value="3"
            icon="📅"
            link="/portal/appointments"
            color="primary"
          />
          <DashboardCard
            title="Prescriptions"
            value="2 Active"
            icon="💊"
            link="/portal/prescriptions"
            color="success"
          />
          <DashboardCard
            title="Test Results"
            value="1 Pending"
            icon="🔬"
            link="/portal/results"
            color="warning"
          />
        </div>

        <section className="portal-section">
          <h2>Your Appointments</h2>
          <AppointmentList
            appointments={userData.appointments}
            onCancel={handleCancelAppointment}
          />
        </section>

        <section className="portal-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/portal/messages" className="quick-action">
              <span className="quick-action__icon">✉️</span>
              <span>Messages</span>
            </Link>
            <Link to="/portal/records" className="quick-action">
              <span className="quick-action__icon">📋</span>
              <span>Medical Records</span>
            </Link>
            <Link to="/portal/billing" className="quick-action">
              <span className="quick-action__icon">💳</span>
              <span>Billing</span>
            </Link>
            <Link to="/portal/profile" className="quick-action">
              <span className="quick-action__icon">👤</span>
              <span>Profile Settings</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientPortal; 