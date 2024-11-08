import { useState } from 'react';
import Button from '../common/Button';
import './MedicalRecord.css';

function MedicalRecord({ record }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="medical-record">
      <div className="medical-record__header">
        <div className="medical-record__title">
          <h3>{record.type}</h3>
          <span className={`medical-record__category category--${record.category.toLowerCase()}`}>
            {record.category}
          </span>
        </div>
        <time className="medical-record__date">{formatDate(record.date)}</time>
      </div>

      <div className="medical-record__provider">
        <img src={record.provider.avatar} alt={record.provider.name} />
        <div>
          <span className="medical-record__provider-name">
            Dr. {record.provider.name}
          </span>
          <span className="medical-record__provider-specialty">
            {record.provider.specialty}
          </span>
        </div>
      </div>

      <div className={`medical-record__content ${isExpanded ? 'expanded' : ''}`}>
        {record.summary && (
          <p className="medical-record__summary">{record.summary}</p>
        )}
        
        {record.details && isExpanded && (
          <div className="medical-record__details">
            {Object.entries(record.details).map(([key, value]) => (
              <div key={key} className="medical-record__detail-item">
                <span className="medical-record__detail-label">{key}:</span>
                <span className="medical-record__detail-value">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {record.details && (
        <button 
          className="medical-record__expand"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}

      <div className="medical-record__actions">
        {record.files?.map((file, index) => (
          <Button
            key={index}
            variant="outline"
            className="medical-record__action"
            onClick={() => window.open(file.url)}
          >
            {file.type === 'pdf' ? '📄' : '🖼️'} View {file.name}
          </Button>
        ))}
        <Button variant="primary" className="medical-record__action">
          Download Record
        </Button>
      </div>
    </div>
  );
}

export default MedicalRecord; 