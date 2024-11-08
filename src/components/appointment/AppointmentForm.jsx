import { useState } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Card from '../common/Card';
import './AppointmentForm.css';

const services = [
  'General Check-up',
  'Vaccination',
  'Laboratory Tests',
  'Dental Care',
  'Eye Examination',
  'Physical Therapy',
];

function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
    } catch (error) {
      setErrors({ submit: 'Failed to submit appointment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (submitSuccess) {
    return (
      <Card className="appointment-success">
        <div className="appointment-success__icon">✓</div>
        <h3>Appointment Request Submitted!</h3>
        <p>We'll contact you shortly to confirm your appointment.</p>
        <Button 
          onClick={() => setSubmitSuccess(false)}
          variant="primary"
        >
          Book Another Appointment
        </Button>
      </Card>
    );
  }

  return (
    <Card className="appointment-form">
      <form onSubmit={handleSubmit}>
        <div className="appointment-form__grid">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
          
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <FormInput
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          
          <div className="form-field">
            <label className="form-field__label">
              Service
              <span className="form-field__required">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-field__input"
              required
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="form-field__error">{errors.service}</span>
            )}
          </div>
          
          <FormInput
            label="Preferred Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
            min={new Date().toISOString().split('T')[0]}
          />
          
          <FormInput
            label="Preferred Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-field__label">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-field__input"
            rows="4"
            placeholder="Any specific concerns or requirements?"
          />
        </div>

        {errors.submit && (
          <div className="appointment-form__error">
            {errors.submit}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="appointment-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
}

export default AppointmentForm; 