import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Button from '../common/Button';
import './HeroSection.css';

function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero__content > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__background">
        <div className="hero__overlay"></div>
      </div>
      <div className="container hero__container">
        <div className="hero__content">
          <h1>Your Health Journey Begins Here</h1>
          <p className="hero__subtitle">
            Experience comprehensive healthcare with a personal touch. 
            24/7 care from experienced professionals you can trust.
          </p>
          <div className="hero__cta">
            <Link to="/appointment">
              <Button variant="primary" size="large">
                Book an Appointment
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="large">
                Our Services
              </Button>
            </Link>
          </div>
          <div className="hero__features">
            <div className="hero__feature">
              <span className="hero__feature-icon">🏥</span>
              <span>24/7 Emergency Care</span>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-icon">👨‍⚕️</span>
              <span>Expert Physicians</span>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-icon">💊</span>
              <span>Modern Facilities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 