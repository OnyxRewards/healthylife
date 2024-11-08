import { useState } from 'react';
import Button from '../common/Button';
import './PrescriptionCard.css';

function PrescriptionCard({ prescription, onRefillRequest }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const calculateRefillStatus = () => {
    const refillsLeft = prescription.refillsRemaining;
    const daysLeft = Math.ceil((new Date(prescription.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (refillsLeft === 0) return { status: 'expired', label: 'No Refills Left' };
    if (daysLeft <= 7) return { status: 'warning', label: `${daysLeft} days left` };
    return { status: 'active', label: `${refillsLeft} refills left` };
  };

  const refillStatus = calculateRefillStatus();

  return (
    <div className="prescription-card">
      <div className="prescription-card__header">
        <div className="prescription-card__title">
          <h3>{prescription.medication}</h3>
          <span className={`prescription-card__status status--${refillStatus.status}`}>
            {refillStatus.label}
          </span>
        </div>
        <div className="prescription-card__dosage">
          {prescription.dosage}
        </div>
      </div>

      <div className="prescription-card__info">
        <div className="prescription-card__info-item">
          <span className="prescription-card__label">Prescribed by:</span>
          <span className="prescription-card__value">Dr. {prescription.prescribedBy}</span>
        </div>
        <div className="prescription-card__info-item">
          <span className="prescription-card__label">Prescribed on:</span>
          <span className="prescription-card__value">
            {new Date(prescription.prescribedDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {isDetailsVisible && (
        <div className="prescription-card__details">
          <div className="prescription-card__detail-item">
            <span className="prescription-card__label">Instructions:</span>
            <p className="prescription-card__instructions">{prescription.instructions}</p>
          </div>
          
          <div className="prescription-card__detail-item">
            <span className="prescription-card__label">Side Effects:</span>
            <ul className="prescription-card__side-effects">
              {prescription.sideEffects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>

          <div className="prescription-card__detail-item">
            <span className="prescription-card__label">Pharmacy:</span>
            <div className="prescription-card__pharmacy">
              <p>{prescription.pharmacy.name}</p>
              <p>{prescription.pharmacy.address}</p>
              <p>{prescription.pharmacy.phone}</p>
            </div>
          </div>
        </div>
      )}

      <div className="prescription-card__actions">
        <Button
          variant="outline"
          onClick={() => setIsDetailsVisible(!isDetailsVisible)}
        >
          {isDetailsVisible ? 'Hide Details' : 'Show Details'}
        </Button>
        
        {refillStatus.status !== 'expired' && (
          <Button
            variant="primary"
            onClick={() => onRefillRequest(prescription.id)}
          >
            Request Refill
          </Button>
        )}
      </div>
    </div>
  );
}

export default PrescriptionCard; 