import { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 1,
    title: 'Primary Care',
    category: 'General',
    description: 'Comprehensive healthcare services for patients of all ages, including routine check-ups, preventive care, and treatment of common illnesses.',
    image: '/images/services/primary-care.jpg',
    features: ['Regular Check-ups', 'Vaccinations', 'Health Screenings', 'Chronic Disease Management'],
    price: 'From $100',
    availability: '24/7'
  },
  {
    id: 2,
    title: 'Emergency Care',
    category: 'Emergency',
    description: 'Immediate medical attention for acute injuries, severe illnesses, and life-threatening conditions.',
    image: '/images/services/emergency.jpg',
    features: ['24/7 Emergency Response', 'Trauma Care', 'Critical Care', 'Ambulance Service'],
    price: 'Varies',
    availability: '24/7'
  },
  // Add more services here
];

const categories = ['All', 'General', 'Emergency', 'Specialized', 'Diagnostic'];

function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(services);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredServices(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory]);

  return (
    <div className="services-page">
      <div className="container">
        <div className="services-page__header">
          <h1>Our Services</h1>
          <p>Comprehensive healthcare solutions tailored to your needs</p>
          
          <SearchBar 
            onSearch={setSearchTerm} 
            placeholder="Search for services..."
          />

          <div className="services-page__categories">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="services-page__loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="services-page__grid">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {!isLoading && filteredServices.length === 0 && (
          <div className="services-page__empty">
            <h3>No services found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <Card className="service-card">
      <div className="service-card__image">
        <img src={service.image} alt={service.title} />
        <span className="service-card__category">{service.category}</span>
      </div>
      
      <div className="service-card__content">
        <h3>{service.title}</h3>
        <p className="service-card__description">{service.description}</p>
        
        <ul className="service-card__features">
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        
        <div className="service-card__footer">
          <div className="service-card__info">
            <span className="service-card__price">{service.price}</span>
            <span className="service-card__availability">{service.availability}</span>
          </div>
          
          <Link to={`/appointment?service=${service.title}`}>
            <Button variant="primary">Book Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Services; 