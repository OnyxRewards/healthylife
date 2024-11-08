import { useState } from 'react';
import Button from '../common/Button';
import './PaymentModal.css';

function PaymentModal({ bill, onClose, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await onSubmit({
        paymentMethod,
        cardNumber,
        expiryDate,
        cvv,
        name,
        amount: bill.amount
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="modal">
      <div className="payment-modal">
        <div className="payment-modal__header">
          <h2>Payment Details</h2>
          <button className="payment-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="payment-modal__summary">
          <div className="payment-modal__amount">
            <span>Amount to Pay:</span>
            <span>${bill.amount.toFixed(2)}</span>
          </div>
          <div className="payment-modal__description">
            {bill.description}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-modal__form">
          <div className="payment-modal__methods">
            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-method__label">
                Credit Card
              </span>
            </label>
            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                checked={paymentMethod === 'debit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-method__label">
                Debit Card
              </span>
            </label>
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="payment-modal__actions">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${bill.amount.toFixed(2)}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal; 