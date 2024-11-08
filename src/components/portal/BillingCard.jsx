import { useState } from 'react';
import Button from '../common/Button';
import './BillingCard.css';

function BillingCard({ bill }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'status--paid';
      case 'pending': return 'status--pending';
      case 'overdue': return 'status--overdue';
      default: return '';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="billing-card">
      <div className="billing-card__header">
        <div className="billing-card__title">
          <h3>{bill.description}</h3>
          <span className={`billing-card__status ${getStatusClass(bill.status)}`}>
            {bill.status}
          </span>
        </div>
        <div className="billing-card__amount">
          {formatCurrency(bill.amount)}
        </div>
      </div>

      <div className="billing-card__info">
        <div className="billing-card__info-item">
          <span className="billing-card__label">Bill Date:</span>
          <span>{new Date(bill.date).toLocaleDateString()}</span>
        </div>
        <div className="billing-card__info-item">
          <span className="billing-card__label">Due Date:</span>
          <span>{new Date(bill.dueDate).toLocaleDateString()}</span>
        </div>
        {bill.insurance && (
          <div className="billing-card__info-item">
            <span className="billing-card__label">Insurance:</span>
            <span>{bill.insurance.provider}</span>
          </div>
        )}
      </div>

      {isDetailsVisible && (
        <div className="billing-card__details">
          <h4>Itemized Charges</h4>
          <div className="billing-card__items">
            {bill.items.map((item, index) => (
              <div key={index} className="billing-card__item">
                <span className="billing-card__item-name">{item.description}</span>
                <span className="billing-card__item-amount">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>

          {bill.insurance && (
            <div className="billing-card__insurance">
              <h4>Insurance Details</h4>
              <div className="billing-card__insurance-details">
                <div className="billing-card__info-item">
                  <span className="billing-card__label">Provider:</span>
                  <span>{bill.insurance.provider}</span>
                </div>
                <div className="billing-card__info-item">
                  <span className="billing-card__label">Policy Number:</span>
                  <span>{bill.insurance.policyNumber}</span>
                </div>
                <div className="billing-card__info-item">
                  <span className="billing-card__label">Coverage:</span>
                  <span>{bill.insurance.coverage}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="billing-card__footer">
        <Button
          variant="outline"
          onClick={() => setIsDetailsVisible(!isDetailsVisible)}
        >
          {isDetailsVisible ? 'Hide Details' : 'View Details'}
        </Button>
        
        {bill.status !== 'paid' && (
          <Button
            variant="primary"
            onClick={() => window.location.href = `/portal/payment/${bill.id}`}
          >
            Pay Now
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={() => window.open(bill.pdfUrl)}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
}

export default BillingCard; 