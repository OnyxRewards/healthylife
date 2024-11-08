import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <img src="/logo.svg" alt="HealthyLife Clinic" />
          <span>HealthyLife Clinic</span>
        </Link>

        <button 
          className={`header__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Navigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        
        <div className="header__cta">
          <Link to="/appointment" className="button button--primary">
            Book Appointment
          </Link>
          <a href="tel:1234567890" className="header__phone">
            (123) 456-7890
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header; 