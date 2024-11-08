import './Card.css';

function Card({ 
  children, 
  variant = 'default',
  className = '', 
  elevation = 'medium',
  hover = true,
  ...props 
}) {
  return (
    <div 
      className={`
        card 
        card--${variant} 
        card--elevation-${elevation}
        ${hover ? 'card--hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card; 