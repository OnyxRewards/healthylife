import './Button.css';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button; 