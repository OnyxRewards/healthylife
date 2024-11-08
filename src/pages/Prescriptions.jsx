import { useState, useEffect } from 'react';
import PrescriptionCard from '../components/portal/PrescriptionCard';
import Button from '../common/Button';
import './Prescriptions.css';

const mockPrescriptions = [
  {
    id: 1,
    medication: 'Amoxicillin',
    dosage: '500mg, 3 times daily',
    prescribedBy: 'Sarah Johnson',
    prescribedDate: '2024-03-01',
    endDate: '2024-04-01',
    refillsRemaining: 2,
    instructions: 'Take with food. Complete the full course even if you feel better.',
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Rash',
      'Allergic reactions'
    ],
    pharmacy: {
      name: 'HealthCare Pharmacy',
      address: '123 Main St, City, State 12345',
      phone: '(123) 456-7890'
    }
  },
  // Add more mock prescriptions...
];

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('active');
  const [isLoading, setIsLoading] = useState(true);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrescriptions(mockPrescriptions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRefillRequest = (prescriptionId) => {
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    setSelectedPrescription(prescription);
    setShowRefillModal(true);
  };

  const confirmRefillRequest = async () => {
    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update prescription refills
    setPrescriptions(prescriptions.map(p => 
      p.id === selectedPrescription.id
        ? { ...p, refillsRemaining: p.refillsRemaining - 1 }
        : p
    ));
    
    setShowRefillModal(false);
    setSelectedPrescription(null);
    setIsLoading(false);
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const today = new Date();
    const endDate = new Date(prescription.endDate);
    
    if (activeFilter === 'active') {
      return endDate >= today && prescription.refillsRemaining > 0;
    } else if (activeFilter === 'expired') {
      return endDate < today || prescription.refillsRemaining === 0;
    }
    return true;
  });

  return (
    <div className="prescriptions">
      <div className="container">
        <header className="prescriptions__header">
          <div>
            <h1>Prescriptions</h1>
            <p>Manage your medications and refills</p>
          </div>
          
          <div className="prescriptions__filters">
            <button
              className={`filter-button ${activeFilter === 'active' ? 'active' : ''}`}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-button ${activeFilter === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveFilter('expired')}
            >
              Expired
            </button>
            <button
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="prescriptions__loading">
            <div className="loader"></div>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="prescriptions__empty">
            <h3>No prescriptions found</h3>
            <p>No {activeFilter} prescriptions to display</p>
          </div>
        ) : (
          <div className="prescriptions__grid">
            {filteredPrescriptions.map(prescription => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
                onRefillRequest={handleRefillRequest}
              />
            ))}
          </div>
        )}

        {showRefillModal && (
          <div className="modal">
            <div className="modal__content">
              <h2>Confirm Refill Request</h2>
              <p>
                Are you sure you want to request a refill for{' '}
                {selectedPrescription.medication}?
              </p>
              <div className="modal__actions">
                <Button
                  variant="outline"
                  onClick={() => setShowRefillModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmRefillRequest}
                >
                  Confirm Refill
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prescriptions; 