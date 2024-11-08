import { useState } from 'react';
import Map from '../components/contact/Map';
import ContactInfo from '../components/contact/ContactInfo';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import './Contact.css';

const location = {
  lat: 40.7128,
  lng: -74.0060,
  address: '123 Health Street, Medical District, City, 12345'
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-page__header">
          <h1>Contact Us</h1>
          <p>Get in touch with our healthcare professionals</p>
        </div>

        <div className="contact-page__grid">
          <div className="contact-page__form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <FormInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <FormInput
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              
              <div className="form-field">
                <label className="form-field__label">
                  Message
                  <span className="form-field__required">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-field__input"
                  rows="6"
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="contact-form__success">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contact-form__error">
                  Failed to send message. Please try again.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="contact-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          <div className="contact-page__info-section">
            <ContactInfo />
          </div>
        </div>

        <div className="contact-page__map">
          <Map location={location} />
        </div>
      </div>
    </div>
  );
}

export default Contact; 