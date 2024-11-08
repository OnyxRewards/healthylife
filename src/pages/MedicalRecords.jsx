import { useState, useEffect } from 'react';
import MedicalRecord from '../components/portal/MedicalRecord';
import SearchBar from '../components/common/SearchBar';
import './MedicalRecords.css';

const categories = ['All', 'Consultation', 'Test', 'Prescription', 'Vaccination'];

const mockRecords = [
  {
    id: 1,
    type: 'Annual Physical Examination',
    category: 'Consultation',
    date: '2024-03-15',
    provider: {
      name: 'Sarah Johnson',
      specialty: 'Internal Medicine',
      avatar: '/images/doctors/sarah.jpg'
    },
    summary: 'Routine annual physical examination with standard health screenings.',
    details: {
      'Blood Pressure': '120/80 mmHg',
      'Heart Rate': '72 bpm',
      'Weight': '70 kg',
      'BMI': '22.5',
      'Notes': 'Patient is in good health. Recommended continued exercise and balanced diet.'
    },
    files: [
      { name: 'Examination Report', type: 'pdf', url: '/reports/exam-2024.pdf' }
    ]
  },
  // Add more mock records...
];

function MedicalRecords() {
  const [records, setRecords] = useState(mockRecords);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockRecords.filter(record => {
        const matchesCategory = activeCategory === 'All' || record.category === activeCategory;
        const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.date) - new Date(a.date);
        }
        return a.type.localeCompare(b.type);
      });

      setRecords(sorted);
      setIsLoading(false);
    }, 500);
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <div className="medical-records">
      <div className="container">
        <header className="medical-records__header">
          <div>
            <h1>Medical Records</h1>
            <p>View and download your medical history</p>
          </div>
          
          <div className="medical-records__actions">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="medical-records__sort"
            >
              <option value="date">Sort by Date</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
        </header>

        <div className="medical-records__filters">
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search records..."
          />
          
          <div className="medical-records__categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="medical-records__loading">
            <div className="loader"></div>
          </div>
        ) : records.length === 0 ? (
          <div className="medical-records__empty">
            <h3>No records found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="medical-records__grid">
            {records.map(record => (
              <MedicalRecord key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalRecords; 