import { useState } from 'react';
import './PaymentHistory.css';

function PaymentHistory({ payments }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all');

  const years = [...new Set(payments.map(payment => 
    new Date(payment.date).getFullYear()
  ))].sort((a, b) => b - a);

  const months = [
    { value: 'all', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' }
  ];

  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    const yearMatch = paymentDate.getFullYear() === selectedYear;
    const monthMatch = selectedMonth === 'all' || paymentDate.getMonth() === parseInt(selectedMonth);
    return yearMatch && monthMatch;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="payment-history">
      <div className="payment-history__header">
        <h2>Payment History</h2>
        <div className="payment-history__filters">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="payment-history__select"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="payment-history__select"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="payment-history__summary">
        <div className="payment-history__total">
          <span>Total Payments:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="payment-history__count">
          <span>Number of Payments:</span>
          <span>{filteredPayments.length}</span>
        </div>
      </div>

      <div className="payment-history__table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>{payment.description}</td>
                <td>
                  <div className="payment-method-cell">
                    <span className={`payment-icon payment-icon--${payment.method.toLowerCase()}`}>
                      {payment.method === 'Credit' ? '💳' : '🏦'}
                    </span>
                    {payment.method}
                  </div>
                </td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>
                  <span className={`payment-status status--${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="download-button"
                    onClick={() => window.open(payment.receiptUrl)}
                  >
                    📄 Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="payment-history__empty">
          <p>No payments found for the selected period</p>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory; 