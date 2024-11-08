import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TeamMember from '../components/about/TeamMember';
import Timeline from '../components/about/Timeline';
import './About.css';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    image: '/images/team/sarah.jpg',
    bio: 'Dr. Johnson has over 15 years of experience in internal medicine...',
    specialties: ['Internal Medicine', 'Preventive Care', 'Geriatrics'],
    social: [
      { icon: '𝕏', url: 'https://twitter.com/drjohnson' },
      { icon: 'in', url: 'https://linkedin.com/in/drjohnson' }
    ]
  },
  // Add more team members...
];

const historyEvents = [
  {
    year: '2005',
    title: 'Foundation',
    description: 'HealthyLife Clinic was established with a mission to provide...',
    image: '/images/history/foundation.jpg'
  },
  // Add more events...
];

function About() {
  const valuesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.values__item', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <h1>About HealthyLife Clinic</h1>
          <p className="about-hero__subtitle">
            Providing exceptional healthcare services since 2005
          </p>
        </section>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            To provide accessible, high-quality healthcare services while promoting
            wellness and preventive care in our community.
          </p>
        </section>

        <section className="values" ref={valuesRef}>
          <h2>Our Values</h2>
          <div className="values__grid">
            {[
              {
                icon: '❤️',
                title: 'Compassion',
                description: 'We treat every patient with empathy and understanding'
              },
              {
                icon: '🎯',
                title: 'Excellence',
                description: 'We strive for the highest standards in healthcare'
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'We maintain ethical practices and transparency'
              },
              {
                icon: '🔄',
                title: 'Innovation',
                description: 'We embrace advanced medical technologies'
              }
            ].map((value, index) => (
              <div key={index} className="values__item">
                <span className="values__icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="team">
          <h2>Our Team</h2>
          <div className="team__grid">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </section>

        <section className="history">
          <h2>Our History</h2>
          <Timeline events={historyEvents} />
        </section>
      </div>
    </div>
  );
}

export default About; 