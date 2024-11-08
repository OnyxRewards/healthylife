import { Link } from 'react-router-dom';
import './DashboardCard.css';

function DashboardCard({ title, value, icon, link, trend, color = 'primary' }) {
  return (
    <Link to={link} className={`dashboard-card dashboard-card--${color}`}>
      <div className="dashboard-card__icon">
        {icon}
      </div>
      
      <div className="dashboard-card__content">
        <h3 className="dashboard-card__title">{title}</h3>
        <div className="dashboard-card__value">{value}</div>
        
        {trend && (
          <div className={`dashboard-card__trend ${
            trend.type === 'increase' ? 'trend--up' : 'trend--down'
          }`}>
            {trend.type === 'increase' ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
    </Link>
  );
}

export default DashboardCard; 