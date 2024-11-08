import { useState, useEffect } from 'react';
import TestResultCard from '../components/portal/TestResultCard';
import SearchBar from '../components/common/SearchBar';
import './TestResults.css';

const mockResults = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    date: '2024-03-15',
    status: 'Normal',
    value: '14.2',
    unit: 'g/dL',
    referenceRange: '13.5 - 17.5 g/dL',
    previousValue: '14.0',
    trend: {
      dates: ['Jan', 'Feb', 'Mar', 'Apr'],
      values: [13.8, 14.0, 14.2, 14.2]
    },
    notes: 'All parameters within normal range. No significant changes from previous results.',
    provider: {
      name: 'Sarah Johnson',
      specialty: 'Hematology',
      avatar: '/images/doctors/sarah.jpg'
    },
    reportUrl: '/reports/cbc-2024.pdf',
    category: 'Blood Test'
  },
  // Add more mock results...
];

const categories = ['All', 'Blood Test', 'Imaging', 'Pathology', 'Other'];

function TestResults() {
  const [results, setResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredResults = results.filter(result => {
    const matchesCategory = activeCategory === 'All' || result.category === activeCategory;
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="test-results">
      <div className="container">
        <header className="test-results__header">
          <div>
            <h1>Test Results</h1>
            <p>View and track your laboratory and imaging results</p>
          </div>

          <div className="test-results__controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="test-results__sort"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </header>

        <div className="test-results__filters">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search test results..."
          />

          <div className="test-results__categories">
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
          <div className="test-results__loading">
            <div className="loader"></div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="test-results__empty">
            <h3>No results found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="test-results__grid">
            {filteredResults.map(result => (
              <TestResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TestResults; 