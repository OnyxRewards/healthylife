import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Button from '../common/Button';
import './TestResultCard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TestResultCard({ result }) {
  const [showTrend, setShowTrend] = useState(false);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'status--normal';
      case 'high': return 'status--high';
      case 'low': return 'status--low';
      default: return '';
    }
  };

  const chartData = {
    labels: result.trend?.dates || [],
    datasets: [
      {
        label: result.name,
        data: result.trend?.values || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="test-result-card">
      <div className="test-result-card__header">
        <div className="test-result-card__title">
          <h3>{result.name}</h3>
          <span className={`test-result-card__status ${getStatusClass(result.status)}`}>
            {result.status}
          </span>
        </div>
        <time className="test-result-card__date">
          {new Date(result.date).toLocaleDateString()}
        </time>
      </div>

      <div className="test-result-card__content">
        <div className="test-result-card__value">
          <span className="test-result-card__number">{result.value}</span>
          <span className="test-result-card__unit">{result.unit}</span>
        </div>

        <div className="test-result-card__range">
          <div className="test-result-card__range-item">
            <span className="test-result-card__label">Reference Range:</span>
            <span>{result.referenceRange}</span>
          </div>
          {result.previousValue && (
            <div className="test-result-card__range-item">
              <span className="test-result-card__label">Previous:</span>
              <span>{result.previousValue} {result.unit}</span>
            </div>
          )}
        </div>

        {result.trend && (
          <div className={`test-result-card__trend ${showTrend ? 'expanded' : ''}`}>
            <button 
              className="test-result-card__trend-toggle"
              onClick={() => setShowTrend(!showTrend)}
            >
              {showTrend ? 'Hide Trend' : 'Show Trend'}
            </button>
            {showTrend && (
              <div className="test-result-card__chart">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        )}

        {result.notes && (
          <div className="test-result-card__notes">
            <span className="test-result-card__label">Notes:</span>
            <p>{result.notes}</p>
          </div>
        )}
      </div>

      <div className="test-result-card__footer">
        <div className="test-result-card__provider">
          <img src={result.provider.avatar} alt={result.provider.name} />
          <div>
            <span className="test-result-card__provider-name">
              Dr. {result.provider.name}
            </span>
            <span className="test-result-card__provider-role">
              {result.provider.specialty}
            </span>
          </div>
        </div>

        <div className="test-result-card__actions">
          <Button variant="outline" onClick={() => window.open(result.reportUrl)}>
            View Full Report
          </Button>
          <Button variant="primary">Download PDF</Button>
        </div>
      </div>
    </div>
  );
}

export default TestResultCard; 