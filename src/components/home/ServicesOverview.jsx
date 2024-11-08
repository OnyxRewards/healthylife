import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesOverview.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '🏥',
    title: 'Primary Care',
    description: 'Comprehensive health services for you and your family.',
    link: '/services/primary-care'
  },
  {
    icon: '🚑',
    title: 'Emergency Care',
    description: '24/7 emergency medical services when you need them most.',
    link: '/services/emergency'
  },
  {
    icon: '💉',
    title: 'Vaccinations',
    description: 'Stay protected with our immunization services.',
    link: '/services/vaccinations'
  },
  {
    icon: '🔬',
    title: 'Lab Services',
    description: 'Advanced diagnostic and laboratory testing facilities.',
    link: '/services/lab-services'
  }
];

function ServicesOverview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-overview" ref={sectionRef}>
      <div className="container">
        <h2 className="services-overview__title">Our Services</h2>
        <p className="services-overview__subtitle">
          Comprehensive healthcare solutions tailored to your needs
        </p>
        
        <div className="services-overview__grid">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="service-card">
              <span className="service-card__icon">{service.icon}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <span className="service-card__link">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesOverview; 