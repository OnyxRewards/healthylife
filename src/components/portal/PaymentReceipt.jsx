import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';
import Button from '../common/Button';
import './PaymentReceipt.css';

function PaymentReceipt({ payment, onClose }) {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Payment_Receipt_${payment.id}`,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="receipt-modal">
      <div className="receipt-modal__content">
        <div className="receipt-modal__header">
          <h2>Payment Receipt</h2>
          <button className="receipt-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="receipt" ref={receiptRef}>
          <div className="receipt__header">
            <img 
              src="/images/logo.png" 
              alt="Hospital Logo" 
              className="receipt__logo"
            />
            <div className="receipt__hospital">
              <h2>City General Hospital</h2>
              <p>123 Healthcare Avenue</p>
              <p>Medical City, MC 12345</p>
              <p>Tel: (555) 123-4567</p>
            </div>
          </div>

          <div className="receipt__divider" />

          <div className="receipt__details">
            <div className="receipt__row">
              <span>Receipt Number:</span>
              <span>{payment.id}</span>
            </div>
            <div className="receipt__row">
              <span>Date:</span>
              <span>{formatDate(payment.date)}</span>
            </div>
            <div className="receipt__row">
              <span>Patient Name:</span>
              <span>{payment.patientName}</span>
            </div>
            <div className="receipt__row">
              <span>Patient ID:</span>
              <span>{payment.patientId}</span>
            </div>
          </div>

          <div className="receipt__divider" />

          <div className="receipt__services">
            <h3>Services</h3>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payment.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Subtotal</td>
                  <td>${payment.subtotal.toFixed(2)}</td>
                </tr>
                {payment.insurance && (
                  <tr>
                    <td>Insurance Coverage ({payment.insurance.coverage}%)</td>
                    <td>-${payment.insurance.amount.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="total">
                  <td>Total Paid</td>
                  <td>${payment.amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="receipt__payment">
            <h3>Payment Information</h3>
            <div className="receipt__row">
              <span>Payment Method:</span>
              <span>{payment.method}</span>
            </div>
            <div className="receipt__row">
              <span>Card Number:</span>
              <span>****{payment.lastFourDigits}</span>
            </div>
            <div className="receipt__row">
              <span>Transaction ID:</span>
              <span>{payment.transactionId}</span>
            </div>
          </div>

          <div className="receipt__footer">
            <div className="receipt__qr">
              <QRCode 
                value={`https://hospital.com/verify/${payment.id}`}
                size={100}
                level="H"
              />
            </div>
            <p className="receipt__verification">
              Verify this receipt at: hospital.com/verify/{payment.id}
            </p>
            <p className="receipt__thank-you">
              Thank you for choosing City General Hospital
            </p>
          </div>
        </div>

        <div className="receipt-modal__actions">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReceipt; 