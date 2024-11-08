import { useState, useEffect } from 'react';
import BillingCard from '../components/portal/BillingCard';
import PaymentModal from '../components/portal/PaymentModal';
import { PieChart } from 'react-chartjs-2';
import './Billing.css';

const mockBills = [
  {
    id: 1,
    description: 'Annual Physical Examination',
    status: 'pending',
    amount: 250.00,
    date: '2024-03-01',
    dueDate: '2024-03-31',
    items: [
      { description: 'Consultation', amount: 150.00 },
      { description: 'Lab Tests', amount: 100.00 }
    ],
    insurance: {
      provider: 'Blue Cross',
      policyNumber: 'BC123456789',
      coverage: 80
    },
    pdfUrl: '/bills/annual-physical-2024.pdf'
  },
  // Add more mock bills...
];

function Billing() {
  const [bills, setBills] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [billingStats, setBillingStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBills(mockBills);
      calculateBillingStats(mockBills);
      setIsLoading(false);
    }, 1000);
  }, []);

  const calculateBillingStats = (bills) => {
    const stats = bills.reduce((acc, bill) => {
      acc.total += bill.amount;
      switch (bill.status.toLowerCase()) {
        case 'paid':
          acc.paid += bill.amount;
          break;
        case 'pending':
          acc.pending += bill.amount;
          break;
        case 'overdue':
          acc.overdue += bill.amount;
          break;
      }
      return acc;
    }, { total: 0, paid: 0, pending: 0, overdue: 0 });

    setBillingStats(stats);
  };

  const handlePayment = async (paymentDetails) => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update bill status
      const updatedBills = bills.map(bill => 
        bill.id === selectedBill.id
          ? { ...bill, status: 'paid' }
          : bill
      );
      
      setBills(updatedBills);
      calculateBillingStats(updatedBills);
      setShowPaymentModal(false);
      setSelectedBill(null);
      
      // Show success message
      alert('Payment processed successfully!');
    } catch (error) {
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [{
      data: [billingStats.paid, billingStats.pending, billingStats.overdue],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const filteredBills = bills.filter(bill => {
    if (activeFilter === 'all') return true;
    return bill.status.toLowerCase() === activeFilter;
  });

  return (
    <div className="billing">
      <div className="container">
        <header className="billing__header">
          <div>
            <h1>Billing & Payments</h1>
            <p>Manage your medical bills and payments</p>
          </div>
        </header>

        <div className="billing__overview">
          <div className="billing__stats">
            <div className="stat-card">
              <h3>Total Outstanding</h3>
              <div className="stat-card__amount">
                ${(billingStats.pending + billingStats.overdue).toFixed(2)}
              </div>
            </div>
            <div className="stat-card">
              <h3>Paid This Month</h3>
              <div className="stat-card__amount">
                ${billingStats.paid.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="billing__chart">
            <h3>Payment Distribution</h3>
            <div className="chart-container">
              <PieChart data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="billing__filters">
          <div className="filter-buttons">
            {['all', 'pending', 'paid', 'overdue'].map(filter => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="billing__loading">
            <div className="loader"></div>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="billing__empty">
            <h3>No bills found</h3>
            <p>No {activeFilter} bills to display</p>
          </div>
        ) : (
          <div className="billing__grid">
            {filteredBills.map(bill => (
              <BillingCard
                key={bill.id}
                bill={bill}
                onPayNow={() => {
                  setSelectedBill(bill);
                  setShowPaymentModal(true);
                }}
              />
            ))}
          </div>
        )}

        {showPaymentModal && (
          <PaymentModal
            bill={selectedBill}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedBill(null);
            }}
            onSubmit={handlePayment}
          />
        )}
      </div>
    </div>
  );
}

export default Billing; 