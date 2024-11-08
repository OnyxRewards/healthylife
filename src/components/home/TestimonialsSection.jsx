import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../common/Card';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    image: "/images/testimonials/sarah.jpg",
    quote: "The care I received at HealthyLife Clinic was exceptional. The staff was attentive and professional, making me feel comfortable throughout my visit.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Patient",
    image: "/images/testimonials/michael.jpg",
    quote: "I've been coming to HealthyLife Clinic for years. Their 24/7 availability and expert care have made them my go-to healthcare provider.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "New Patient",
    image: "/images/testimonials/emily.jpg",
    quote: "From the moment I walked in, I knew I was in good hands. The doctors took time to listen and explain everything clearly.",
    rating: 5
  }
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <h2 className="testimonials__title">What Our Patients Say</h2>
        <p className="testimonials__subtitle">
          Real experiences from our valued patients
        </p>

        <div className="testimonials__slider" ref={slideRef}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`testimonial-card ${
                index === activeIndex ? 'testimonial-card--active' : ''
              }`}
              elevation="high"
            >
              <div className="testimonial-card__rating">
                {renderStars(testimonial.rating)}
              </div>
              <blockquote className="testimonial-card__quote">
                {testimonial.quote}
              </blockquote>
              <div className="testimonial-card__author">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-card__author-image" 
                />
                <div className="testimonial-card__author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${
                index === activeIndex ? 'testimonials__dot--active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;