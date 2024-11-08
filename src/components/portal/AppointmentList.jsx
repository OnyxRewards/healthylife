import { useState } from 'react';
import Button from '../common/Button';
import './AppointmentList.css';

function AppointmentList({ appointments, onCancel }) {
  const [filter, setFilter] = useState('upcoming');

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return appointmentDate >= today;
    } else if (filter === 'past') {
      return appointmentDate < today;
    }
    return true;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status--confirmed';
      case 'pending': return 'status--pending';
      case 'cancelled': return 'status--cancelled';
      default: return '';
    }
  };

  return (
    <div className="appointment-list">
      <div className="appointment-list__header">
        <div className="appointment-list__filters">
          <button
            className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-button ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="appointment-list__empty">
          No {filter} appointments found
        </div>
      ) : (
        <div className="appointment-list__grid">
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-card__header">
                <span className={`appointment-card__status ${getStatusClass(appointment.status)}`}>
                  {appointment.status}
                </span>
                <time className="appointment-card__date">
                  {new Date(appointment.date).toLocaleDateString()}
                </time>
              </div>

              <div className="appointment-card__content">
                <h3 className="appointment-card__service">{appointment.service}</h3>
                <p className="appointment-card__doctor">
                  with Dr. {appointment.doctor}
                </p>
                <time className="appointment-card__time">
                  {appointment.time}
                </time>
              </div>

              <div className="appointment-card__footer">
                {appointment.status === 'confirmed' && new Date(appointment.date) > new Date() && (
                  <Button
                    variant="outline"
                    onClick={() => onCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
                <Button variant="primary">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList; 