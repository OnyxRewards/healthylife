import AppointmentForm from '../components/appointment/AppointmentForm';
import './AppointmentPage.css';

function AppointmentPage() {
  return (
    <div className="appointment-page">
      <div className="container">
        <div className="appointment-page__header">
          <h1>Book an Appointment</h1>
          <p>Schedule your visit with our healthcare professionals</p>
        </div>
        
        <div className="appointment-page__info">
          <div className="info-card">
            <span className="info-card__icon">📞</span>
            <h3>Need Immediate Assistance?</h3>
            <p>Call us at <strong>(123) 456-7890</strong></p>
          </div>
          
          <div className="info-card">
            <span className="info-card__icon">⚡</span>
            <h3>Emergency Services</h3>
            <p>Available 24/7 for urgent care</p>
          </div>
        </div>

        <AppointmentForm />
      </div>
    </div>
  );
}

export default AppointmentPage; 