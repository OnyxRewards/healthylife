import './FormInput.css';

function FormInput({
  label,
  type = 'text',
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        required={required}
        {...props}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

export default FormInput; 