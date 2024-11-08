import './ContactInfo.css';

function ContactInfo() {
  const contactDetails = [
    {
      icon: '📞',
      title: 'Phone',
      primary: '(123) 456-7890',
      secondary: 'Mon-Fri 8am-8pm'
    },
    {
      icon: '📧',
      title: 'Email',
      primary: 'info@healthylife.com',
      secondary: 'We reply within 24 hours'
    },
    {
      icon: '📍',
      title: 'Location',
      primary: '123 Health Street',
      secondary: 'Medical District, City, 12345'
    },
    {
      icon: '🕒',
      title: 'Working Hours',
      primary: 'Monday - Friday: 8am - 8pm',
      secondary: 'Saturday: 9am - 5pm, Sunday: Closed'
    }
  ];

  const socialLinks = [
    { icon: '𝕏', url: 'https://twitter.com/healthylife' },
    { icon: 'f', url: 'https://facebook.com/healthylife' },
    { icon: 'in', url: 'https://linkedin.com/company/healthylife' },
    { icon: '📷', url: 'https://instagram.com/healthylife' }
  ];

  return (
    <div className="contact-info">
      <div className="contact-info__details">
        {contactDetails.map((detail, index) => (
          <div key={index} className="contact-info__item">
            <span className="contact-info__icon">{detail.icon}</span>
            <div className="contact-info__text">
              <h3>{detail.title}</h3>
              <p>{detail.primary}</p>
              <p className="contact-info__secondary">{detail.secondary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-info__social">
        <h3>Follow Us</h3>
        <div className="contact-info__social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo; 